# Base de Datos

TaskFlow API utiliza PostgreSQL como base de datos principal y Prisma como ORM.

La elección de PostgreSQL responde a varios motivos:

- Consistencia transaccional.
- Excelente soporte para relaciones.
- Madurez y estabilidad.
- Amplia adopción en entornos empresariales.
- Compatibilidad con Prisma.

Prisma fue elegido por ofrecer una experiencia de desarrollo moderna, tipada y altamente productiva para proyectos en TypeScript.

---

# Arquitectura de Persistencia

La aplicación no accede directamente a Prisma desde los controladores ni desde los casos de uso.

La comunicación con la base de datos se realiza mediante repositorios.

```text
Controller

↓

Use Case

↓

Repository Interface

↓

Prisma Repository

↓

PostgreSQL
```

Gracias a esta separación, la lógica de negocio no depende de Prisma.

Si en el futuro se decide utilizar otro ORM o incluso otro motor de base de datos, el impacto quedará aislado a la capa de infraestructura.

---

# Modelo Actual

Actualmente el sistema cuenta con dos entidades principales.

```text
User

└── Session
```

Relación:

```text
User (1)

↓

Session (N)
```

Un usuario puede tener múltiples sesiones activas simultáneamente.

Por ejemplo:

```text
Juan

├── Notebook
├── Celular
└── Tablet
```

Cada dispositivo genera una sesión independiente.

---

# Tabla User

Representa los usuarios registrados en la plataforma.

```text
User

id
name
email
password
role
createdAt
```

Descripción de los campos:

| Campo | Descripción |
|---------|-------------|
| id | Identificador único |
| name | Nombre del usuario |
| email | Correo electrónico |
| password | Contraseña encriptada |
| role | Rol del usuario |
| createdAt | Fecha de creación |

---

# Roles

Cada usuario posee un rol.

Actualmente existen:

```text
ADMIN

MANAGER

USER
```

Los roles serán utilizados posteriormente por el sistema de autorización.

---

# Tabla Session

La tabla Session permite gestionar sesiones persistentes.

```text
Session

id
userId
refreshToken
expiresAt
revoked
createdAt
```

Descripción:

| Campo | Descripción |
|---------|-------------|
| id | Identificador único |
| userId | Usuario propietario |
| refreshToken | Token asociado |
| expiresAt | Fecha de expiración |
| revoked | Indica si fue invalidada |
| createdAt | Fecha de creación |

---

# ¿Por qué existe Session?

Muchas implementaciones con JWT almacenan únicamente el token en el cliente.

Ese enfoque presenta limitaciones.

Por ejemplo:

```text
JWT

↓

Expira en 7 días

↓

No puede revocarse antes
```

Esto dificulta implementar:

- Logout real.
- Logout en todos los dispositivos.
- Revocación de sesiones.
- Auditoría.
- Gestión de dispositivos conectados.

Por ese motivo cada Refresh Token se almacena en PostgreSQL.

---

# Flujo de Persistencia de Sesión

Cuando un usuario inicia sesión:

```text
Login

↓

Generar Refresh Token

↓

Crear Session

↓

Guardar en PostgreSQL
```

Ejemplo:

```text
Session

id: 123

userId: abc

refreshToken: xyz

revoked: false
```

---

# Refresh Token Rotation

Cuando el cliente solicita nuevos tokens:

```text
Refresh Token

↓

Buscar Session

↓

Revocar Session Actual

↓

Crear Nueva Session

↓

Guardar en PostgreSQL
```

Resultado:

```text
Session A

revoked = true


Session B

revoked = false
```

De esta manera nunca reutilizamos indefinidamente el mismo Refresh Token.

---

# Prisma

El esquema de la base de datos se define mediante:

```text
prisma/schema.prisma
```

Prisma genera automáticamente:

- Cliente tipado.
- Tipos TypeScript.
- Migraciones.
- Acceso a datos.

---

# Comandos Utilizados

## Generar Prisma Client

```bash
npx prisma generate
```

Se utiliza cada vez que se modifica el schema.

---

## Crear una Migración

```bash
npx prisma migrate dev --name nombre_migracion
```

Ejemplo:

```bash
npx prisma migrate dev --name add_user_roles
```

---

## Aplicar Migraciones

```bash
npx prisma migrate deploy
```

Utilizado normalmente en entornos productivos.

---

## Abrir Prisma Studio

```bash
npx prisma studio
```

Permite explorar visualmente los datos.

---

## Reiniciar Base de Datos

```bash
npx prisma migrate reset
```

Elimina todas las tablas y vuelve a ejecutar las migraciones.

---

# Evolución del Modelo

El proyecto comenzó únicamente con usuarios.

```text
User
```

Posteriormente apareció la necesidad de soportar:

- Logout.
- Refresh Tokens.
- Múltiples dispositivos.

Por ello se incorporó:

```text
User

↓

Session
```

Más adelante el modelo seguirá evolucionando para soportar:

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

---

# Decisiones de Diseño

## ¿Por qué PostgreSQL?

Porque la autenticación requiere:

- Consistencia.
- Relaciones.
- Transacciones.

PostgreSQL sobresale en estos escenarios.

---

## ¿Por qué Prisma?

Porque proporciona:

- Tipado completo.
- Productividad.
- Migraciones integradas.
- Excelente integración con TypeScript.

---

## ¿Por qué no guardar Refresh Tokens en User?

Porque un usuario puede tener múltiples sesiones activas.

Por ejemplo:

```text
Usuario

├── Chrome
├── Firefox
├── iPhone
└── Tablet
```

Guardar un único Refresh Token en User impediría gestionar correctamente estos escenarios.

---

# ¿Qué aprendimos?

Durante esta etapa del proyecto conseguimos:

- Diseñar un modelo preparado para múltiples sesiones.
- Implementar persistencia de Refresh Tokens.
- Gestionar logout y revocación.
- Mantener desacoplada la lógica de negocio de Prisma.
- Preparar la base de datos para futuras funcionalidades.

---
