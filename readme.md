# TaskFlow API

> Un backend inspirado en entornos de producción construido con **Node.js**, **TypeScript**, **Express**, **Arquitectura Hexagonal**, **Domain-Driven Design (DDD)**, **PostgreSQL**, **Prisma**, **Autenticación JWT**, **Rotación de Refresh Tokens** e **Inyección de Dependencias**.

TaskFlow API es más que una aplicación CRUD. Es un proyecto backend diseñado para simular la arquitectura y las prácticas de ingeniería utilizadas en empresas modernas de software.

El objetivo de este proyecto es demostrar habilidades de ingeniería backend enfocándose en:

* Arquitectura limpia y mantenible
* Escalabilidad
* Seguridad
* Facilidad de pruebas
* Separación de responsabilidades
* Autenticación de nivel empresarial
* Diseño preparado para arquitectura basada en eventos

---

# Tabla de Contenidos

* [Visión del Proyecto](#visión-del-proyecto)
* [Características Actuales](#características-actuales)
* [Stack Tecnológico](#stack-tecnológico)
* [Arquitectura](#arquitectura)
* [Estructura del Proyecto](#estructura-del-proyecto)
* [Flujo de Autenticación](#flujo-de-autenticación)
* [¿Por qué esta Arquitectura?](#por-qué-esta-arquitectura)
* [Primeros Pasos](#primeros-pasos)
* [Variables de Entorno](#variables-de-entorno)
* [Comandos de Prisma](#comandos-de-prisma)
* [Hoja de Ruta de Desarrollo](#hoja-de-ruta-de-desarrollo)
* [Documentación](#documentación)

---

# Visión del Proyecto

En lugar de construir otra API REST simple, este proyecto se enfoca en demostrar cómo se diseñan sistemas backend reales.

Durante el desarrollo del proyecto se fueron introduciendo mejoras arquitectónicas progresivamente en lugar de implementar todo desde el inicio.

Cada mejora resuelve un problema real.

Por ejemplo:

```text
Login Simple

↓

Autenticación JWT

↓

Refresh Tokens

↓

Sesiones Persistentes

↓

Rotación de Refresh Tokens

↓

Inyección de Dependencias

↓

Autorización Basada en Roles

↓

(Arquitectura Basada en Eventos)
```

Este enfoque evolutivo mantiene la arquitectura comprensible mientras permite que el proyecto pueda escalar.

---

# Características Actuales

## Autenticación

* Registro de usuarios
* Inicio de sesión
* Tokens de acceso JWT
* Refresh Tokens
* Rotación de Refresh Tokens
* Cierre de sesión
* Cierre de todas las sesiones

---

## Autorización

* Control de acceso basado en roles (RBAC)
* Roles de usuario
* Middleware de autorización

---

## Backend

* Express 5
* TypeScript
* Arquitectura modular
* Arquitectura Hexagonal
* Domain Driven Design (DDD)
* Inyección de Dependencias (TSyringe)

---

## Base de Datos

* PostgreSQL
* Prisma ORM
* Migraciones
* Persistencia de sesiones

---

## Seguridad

* JWT
* Hash de contraseñas con bcrypt
* Helmet
* CORS
* Validación con Zod
* Manejo de errores
* Rotación de Refresh Tokens

---

## Observabilidad

* Logger Pino
* Morgan
* Registro de peticiones
* Manejador centralizado de errores

---

# Stack Tecnológico

| Categoría                 | Tecnología |
| ------------------------- | ---------- |
| Lenguaje                  | TypeScript |
| Runtime                   | Node.js    |
| Framework                 | Express 5  |
| ORM                       | Prisma     |
| Base de Datos             | PostgreSQL |
| Autenticación             | JWT        |
| Hash de Contraseñas       | bcrypt     |
| Validación                | Zod        |
| Inyección de Dependencias | TSyringe   |
| Logging                   | Pino       |
| Documentación API         | Swagger    |
| Gestor de Paquetes        | npm        |

---

# Arquitectura

La aplicación sigue una arquitectura por capas inspirada en **Arquitectura Hexagonal** y **Domain-Driven Design**.

```text
                Petición HTTP
                     │
                     ▼
              Rutas Express
                     │
                     ▼
              Controladores
                     │
                     ▼
                Casos de Uso
                     │
                     ▼
          Interfaces de Dominio
                     │
      ┌──────────────┴──────────────┐
      ▼                             ▼
 PostgreSQL                    Servicios Externos
   Prisma
```

Cada capa tiene una única responsabilidad.

Las reglas de negocio nunca dependen de Express, Prisma u otros frameworks externos.

---

# Estructura del Proyecto

```text
src/

modules/
    auth/
    users/
    health/

shared/
    config/
    middleware/
    logger/
    responses/
    database/
    container/

prisma/

docs/
```

Cada funcionalidad está aislada dentro de su propio módulo.

Cada módulo contiene:

* Dominio
* Aplicación
* Infraestructura
* Interfaces

Esto mantiene el proyecto altamente modular y fácil de mantener.

---

# Flujo de Autenticación

El proceso de autenticación sigue buenas prácticas modernas.

```text
Inicio de Sesión

↓

Validar Credenciales

↓

Generar Access Token

↓

Generar Refresh Token

↓

Crear Sesión

↓

Guardar Refresh Token en PostgreSQL

↓

Devolver Tokens
```

Cuando el access token expira:

```text
Refresh Token

↓

Validar JWT

↓

Buscar Sesión

↓

Verificar Sesión

↓

Revocar Sesión Anterior

↓

Generar Nuevos Tokens

↓

Guardar Nueva Sesión

↓

Devolver Nuevos Tokens
```

Este proceso se conoce como **Rotación de Refresh Tokens** y mejora significativamente la seguridad.

---

# ¿Por qué esta Arquitectura?

Cada decisión arquitectónica resuelve un problema específico.

| Decisión                  | Problema Resuelto                                |
| ------------------------- | ------------------------------------------------ |
| Arquitectura Hexagonal    | Desacopla la lógica de negocio de los frameworks |
| DDD                       | Mantiene organizadas las reglas de negocio       |
| Inyección de Dependencias | Mejora la capacidad de realizar pruebas          |
| Prisma                    | Simplifica el acceso a la base de datos          |
| PostgreSQL                | Proporciona consistencia relacional sólida       |
| JWT                       | Autenticación sin estado                         |
| Refresh Tokens            | Mejor experiencia de usuario                     |
| Persistencia de Sesiones  | Permite cerrar y revocar sesiones                |
| Zod                       | Validación en tiempo de ejecución                |
| Pino                      | Logging estructurado                             |

---

# Primeros Pasos

Instalar dependencias:

```bash
npm install
```

Generar cliente de Prisma:

```bash
npx prisma generate
```

Ejecutar migraciones de base de datos:

```bash
npx prisma migrate dev
```

Iniciar servidor de desarrollo:

```bash
npm run dev
```

Compilar proyecto:

```bash
npm run build
```

Ejecutar en producción:

```bash
npm start
```

---

# Variables de Entorno

Crear un archivo `.env`.

```env
DATABASE_URL="postgresql://root:root@localhost:5432/taskflow"

JWT_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret

PORT=3000
```

---

# Comandos de Prisma

Generar cliente Prisma:

```bash
npx prisma generate
```

Crear una migración:

```bash
npx prisma migrate dev --name nombre_migracion
```

Aplicar migraciones:

```bash
npx prisma migrate deploy
```

Abrir Prisma Studio:

```bash
npx prisma studio
```

Reiniciar la base de datos:

```bash
npx prisma migrate reset
```

---

# Documentación

La documentación adicional está disponible dentro de la carpeta **docs**.

```text
docs/

01-Architecture.md
02-Authentication.md
03-Database.md
04-DependencyInjection.md
05-Security.md
06-ProjectStructure.md
07-DevelopmentJourney.md
```

Cada documento explica en profundidad un aspecto del proyecto.

---

# Hoja de Ruta de Desarrollo

El sistema actual de autenticación está completo para entornos similares a producción.

Los próximos objetivos son:

* Módulo de Workspaces
* Proyectos
* Tableros
* Tareas
* Comentarios
* Archivos adjuntos
* Registros de actividad (MongoDB)
* Integración con Kafka
* Notificaciones
* Docker
* GitHub Actions
* Pruebas unitarias
* Pruebas de integración
* Métricas
* Prometheus
* Grafana

---

# Principales Fortalezas

* Arquitectura inspirada en sistemas empresariales
* Diseño modular
* Autenticación segura
* Rotación de Refresh Tokens
* Sesiones persistentes
* Inyección de Dependencias
* Preparado para arquitectura basada en eventos
* Organización del código orientada a producción
* Fuerte separación de responsabilidades
* Fácil de probar y extender

---


