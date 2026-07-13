# Estructura del proyecto

TaskFlow API está organizado siguiendo una arquitectura modular.

Cada módulo agrupa todo lo necesario para una funcionalidad específica, evitando que el código relacionado quede disperso por todo el proyecto.

Actualmente la estructura principal es la siguiente.

```text
taskflow-api
│
├── prisma
│
├── docs
│
└── src
    ├── modules
    │
    │   ├── auth
    │   ├── users
    │   └── health
    │
    └── shared
```

---

# Organización por módulos

Cada módulo representa un dominio de negocio independiente.

Por ejemplo:

```text
modules/

auth/
users/
health/
```

En futuras versiones aparecerán nuevos módulos.

```text
modules/

workspace/
projects/
boards/
tasks/
notifications/
```

Cada uno contendrá todo lo necesario para funcionar de forma independiente.

---

# Estructura de un módulo

Todos los módulos siguen exactamente la misma organización.

```text
auth/

application/

domain/

infrastructure/

interfaces/
```

Esto hace que el proyecto sea predecible y fácil de recorrer.

---

# Domain

Contiene el corazón del negocio.

Aquí viven únicamente las reglas de negocio.

```text
domain/

entities/

repositories/

services/

enums/
```

Ejemplos:

- User
- Session
- Role
- Repository Interfaces
- Domain Services

El dominio no conoce Express, Prisma ni ninguna otra tecnología.

---

# Application

La carpeta **application** contiene los casos de uso.

```text
application/

usecases/

dto/
```

Aquí ocurre la lógica de la aplicación.

Ejemplos:

- Login
- Register
- Refresh Token
- Logout

Cada caso de uso representa una acción concreta del sistema.

---

# Infrastructure

La infraestructura contiene las implementaciones técnicas.

```text
infrastructure/

repositories/

services/
```

Por ejemplo:

```text
PrismaUserRepository

JwtTokenService

BcryptHashService
```

Si en el futuro Prisma fuera reemplazado por otro ORM, el impacto quedaría limitado a esta capa.

---

# Interfaces

Esta capa conecta la aplicación con el mundo exterior.

```text
interfaces/

controllers/

routes/
```

Aquí viven:

- Controllers
- Express Routes

Los controladores reciben peticiones HTTP y delegan inmediatamente la lógica a los casos de uso.

---

# Shared

La carpeta **shared** contiene componentes reutilizables por toda la aplicación.

```text
shared/

config/

container/

database/

logger/

middleware/

responses/

errors/
```

Cada carpeta tiene una responsabilidad específica.

## Config

Configuración general del proyecto.

Variables de entorno.

Configuración JWT.

Configuración de la aplicación.

---

## Container

Registro de todas las dependencias utilizadas por TSyringe.

Permite desacoplar la creación de objetos del resto del sistema.

---

## Database

Configuración compartida para acceder a Prisma.

---

## Middleware

Middlewares reutilizables.

Ejemplos:

- Error Handler
- Request Logger
- Authentication

---

## Logger

Configuración centralizada de Pino.

Toda la aplicación utiliza la misma estrategia de logging.

---

## Responses

Objetos utilizados para mantener respuestas HTTP consistentes.

---

# Flujo de una petición

Cuando un cliente realiza una petición, ésta atraviesa distintas capas.

```text
Cliente

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

Cada componente tiene una única responsabilidad.

---

# ¿Dónde agregar una nueva funcionalidad?

Supongamos que queremos incorporar un módulo llamado **Projects**.

La estructura sería:

```text
modules/

projects/

application/

domain/

infrastructure/

interfaces/
```

Dentro de él se crearían:

```text
application/

usecases/

CreateProjectUseCase

UpdateProjectUseCase

DeleteProjectUseCase

GetProjectsUseCase
```

Y sus correspondientes:

- Entidades.
- Repositorios.
- Controladores.
- Rutas.
- Servicios.

No sería necesario modificar la organización existente.

---

# Beneficios de esta estructura

Esta organización permite:

- Separar responsabilidades.
- Reducir el acoplamiento.
- Facilitar las pruebas.
- Escalar el proyecto sin reorganizar carpetas.
- Mantener un patrón consistente entre módulos.

Además, cualquier desarrollador que conozca la estructura de un módulo podrá trabajar inmediatamente sobre cualquier otro.

---

# ¿Qué aprendimos?

La organización del código es tan importante como el código mismo.

Una estructura consistente facilita el mantenimiento, reduce errores y permite incorporar nuevas funcionalidades con un impacto mínimo sobre el resto de la aplicación.

---
