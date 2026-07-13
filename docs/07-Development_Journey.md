# Evolución del proyecto

TaskFlow API no fue desarrollado implementando todas las tecnologías desde el primer día.

La arquitectura fue evolucionando a medida que aparecían nuevas necesidades, de la misma forma que ocurre en un proyecto real.

Cada mejora incorporada resolvió una limitación de la versión anterior.

---

# El punto de partida

El proyecto comenzó con una API mínima utilizando:

- Express
- TypeScript
- PostgreSQL
- Prisma

En esta etapa el objetivo era únicamente disponer de una base sólida sobre la cual construir el resto de la aplicación.

---

# Organización del proyecto

A medida que el código comenzó a crecer surgió la necesidad de organizarlo.

En lugar de separar el proyecto por tipo de archivo (controllers, services, repositories), se decidió organizarlo por dominios.

```text
modules/

auth/

users/

health/
```

Cada módulo encapsula toda la lógica relacionada con una funcionalidad específica.

Esto permite trabajar sobre un módulo sin afectar al resto de la aplicación.

---

# Arquitectura

Una vez organizada la estructura surgió una nueva necesidad.

¿Cómo evitar que la lógica de negocio dependiera de Express o Prisma?

Para resolver este problema se adoptó una arquitectura inspirada en:

- Arquitectura Hexagonal.
- Clean Architecture.
- Domain-Driven Design.

De esta forma las reglas de negocio quedaron aisladas de la infraestructura.

---

# Validación

Las primeras versiones recibían directamente los datos enviados por el cliente.

Esto hacía que la aplicación dependiera de múltiples validaciones manuales.

La solución fue incorporar **Zod**.

```text
Request

↓

Zod

↓

Controller
```

Ahora todas las entradas se validan antes de llegar a la lógica de negocio.

---

# Autenticación

El siguiente paso consistió en implementar un sistema de autenticación.

Inicialmente se utilizó JWT para emitir Access Tokens.

```text
Usuario

↓

Login

↓

Access Token
```

Aunque esta solución funcionaba, rápidamente apareció una limitación importante.

No existía una forma sencilla de cerrar sesión.

---

# Refresh Tokens

Para resolver este problema se incorporaron Refresh Tokens.

Esto permitió emitir nuevos Access Tokens sin obligar al usuario a iniciar sesión nuevamente.

```text
Access Token

↓

Expira

↓

Refresh Token

↓

Nuevo Access Token
```

La experiencia de usuario mejoró considerablemente.

---

# Persistencia de sesiones

El siguiente problema apareció casi inmediatamente.

Aunque existían Refresh Tokens, todavía era imposible revocar una sesión concreta.

La solución fue persistir cada sesión en PostgreSQL.

```text
Usuario

↓

Session

↓

PostgreSQL
```

A partir de ese momento fue posible:

- Revocar sesiones.
- Gestionar múltiples dispositivos.
- Controlar sesiones activas.

---

# Refresh Token Rotation

Posteriormente se incorporó una mejora adicional.

Cada vez que un Refresh Token es utilizado, deja de ser válido.

```text
Refresh Token A

↓

Validar

↓

Revocar

↓

Refresh Token B
```

Esta estrategia reduce considerablemente el riesgo asociado al robo de tokens.

---

# Roles

Una vez resuelta la autenticación, el siguiente paso fue la autorización.

Se incorporó un sistema de roles.

```text
ADMIN

MANAGER

USER
```

Esto permitirá restringir determinadas operaciones según el perfil del usuario.

---

# Dependency Injection

A medida que aumentó el número de casos de uso comenzó a resultar incómodo crear manualmente cada dependencia.

La solución fue incorporar TSyringe.

Antes:

```text
new LoginUseCase(...)
```

Ahora:

```text
container.resolve(LoginUseCase)
```

Con esto la creación de objetos quedó completamente desacoplada del resto de la aplicación.

---

# Resultado actual

Actualmente el proyecto cuenta con:

- Arquitectura modular.
- Arquitectura Hexagonal.
- Clean Architecture.
- Domain-Driven Design.
- Dependency Injection.
- PostgreSQL.
- Prisma.
- JWT.
- Refresh Token Rotation.
- Persistencia de sesiones.
- Roles.
- Validación con Zod.
- Logging.
- Swagger.

Todo ello construido de forma incremental, manteniendo siempre el código organizado y preparado para seguir creciendo.

---

# Lo que viene

La siguiente etapa del proyecto estará enfocada en el dominio de negocio.

Los próximos módulos serán:

```text
Workspace

↓

Projects

↓

Boards

↓

Tasks

↓

Comments
```

Posteriormente se incorporarán nuevas tecnologías para resolver necesidades específicas.

```text
MongoDB

↓

Auditoría

Kafka

↓

Eventos y notificaciones

Docker

↓

Despliegue

GitHub Actions

↓

Integración continua
```

El objetivo es continuar evolucionando la arquitectura sin perder la simplicidad conseguida hasta ahora.

---

# Conclusión

Cada tecnología incorporada durante el desarrollo respondió a una necesidad concreta.

No se añadieron herramientas únicamente por utilizarlas, sino porque resolvían un problema real dentro del proyecto.

Este enfoque permitió construir una base sólida, fácil de mantener y preparada para evolucionar hacia un sistema mucho más completo.