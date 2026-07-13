# Arquitectura

Uno de los principales objetivos de este proyecto no era únicamente construir una API funcional, sino diseñar una base sólida que pudiera crecer sin convertirse en un código difícil de mantener.

En lugar de centrar la arquitectura alrededor de un framework, la aplicación está organizada alrededor del dominio del negocio.

Esto permite que la lógica principal permanezca independiente de Express, Prisma o cualquier otra tecnología utilizada en la infraestructura.

---

## Principios utilizados

Durante el desarrollo se aplicaron los siguientes principios:

- Arquitectura Hexagonal
- Clean Architecture
- Domain-Driven Design (DDD)
- Inversión de Dependencias (SOLID)
- Separación de responsabilidades
- Inyección de dependencias mediante TSyringe

Aunque cada uno resuelve un problema distinto, juntos permiten construir una aplicación desacoplada, testeable y preparada para evolucionar.

---

## Vista general

```text
                   Cliente
                      │
                      ▼
                Express Router
                      │
                      ▼
                 Controller
                      │
                      ▼
                  Use Case
                      │
             ┌────────┴────────┐
             ▼                 ▼
      Repositorios         Servicios
             │
             ▼
        Prisma ORM
             │
             ▼
        PostgreSQL
```

Cada capa conoce únicamente la inmediatamente inferior.

El dominio nunca depende de Express, Prisma o PostgreSQL.

---

## Organización del proyecto

Cada funcionalidad vive dentro de su propio módulo.

```

src/
modules/
auth/
users/
health/

shared/
config/
middleware/
logger/
container/

```

Dentro de cada módulo existe siempre la misma estructura:

```text
domain/
application/
infrastructure/
interfaces/
```

Esto hace que cualquier desarrollador pueda localizar rápidamente dónde debe implementar una nueva funcionalidad.

---

## Flujo de una petición

Cuando un cliente realiza una petición HTTP, el recorrido es el siguiente:

```text
HTTP Request

↓

Router

↓

Controller

↓

Use Case

↓

Repository

↓

Prisma

↓

PostgreSQL
```

La respuesta sigue exactamente el camino inverso hasta llegar al cliente.

Toda la lógica de negocio ocurre dentro de los **Use Cases**, manteniendo los controladores ligeros y enfocados únicamente en HTTP.

---

## ¿Por qué esta arquitectura?

Una aplicación pequeña puede funcionar perfectamente con toda la lógica dentro de los controladores.

Sin embargo, a medida que el proyecto crece aparecen problemas como:

- Lógica duplicada.
- Alto acoplamiento.
- Dificultad para realizar pruebas.
- Dependencia excesiva del framework.
- Código difícil de mantener.

La arquitectura utilizada en este proyecto intenta evitar estos problemas desde el principio.

Gracias a ello es posible:

- Cambiar Express por otro framework sin modificar el dominio.
- Sustituir Prisma por otro ORM con un impacto mínimo.
- Incorporar nuevos módulos sin afectar los existentes.
- Escribir pruebas unitarias utilizando repositorios simulados.
- Mantener una separación clara entre reglas de negocio e infraestructura.

---

## Tecnologías utilizadas

| Capa | Tecnología |
|------|------------|
| Runtime | Node.js |
| Lenguaje | TypeScript |
| Framework HTTP | Express |
| ORM | Prisma |
| Base de datos | PostgreSQL |
| Autenticación | JWT |
| Validación | Zod |
| Inyección de dependencias | TSyringe |
| Logging | Pino |

Cada tecnología fue elegida para cumplir una responsabilidad específica, evitando dependencias innecesarias entre ellas.

---
