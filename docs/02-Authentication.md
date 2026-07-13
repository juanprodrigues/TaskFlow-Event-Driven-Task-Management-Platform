# Autenticación

La autenticación es uno de los pilares de TaskFlow API.

En lugar de implementar un login basado únicamente en JWT, se diseñó un sistema de autenticación inspirado en aplicaciones modernas, permitiendo gestionar sesiones, revocar tokens y cerrar sesión de forma segura.

Actualmente el sistema incluye:

- Registro de usuarios.
- Inicio de sesión.
- JWT Access Tokens.
- Refresh Tokens.
- Persistencia de sesiones.
- Refresh Token Rotation.
- Logout.
- Logout de todas las sesiones.

---

# Flujo de autenticación

Cuando un usuario inicia sesión ocurre el siguiente proceso:

```text
Usuario

↓

POST /auth/login

↓

Validar credenciales

↓

Buscar usuario en PostgreSQL

↓

Comparar contraseña con bcrypt

↓

Generar Access Token

↓

Generar Refresh Token

↓

Crear una nueva sesión

↓

Guardar la sesión en PostgreSQL

↓

Responder al cliente
```

El cliente recibe dos tokens:

```json
{
    "accessToken": "...",
    "refreshToken": "..."
}
```

Cada uno tiene una responsabilidad distinta.

---

# Access Token

El Access Token tiene una vida útil corta y se utiliza para acceder a los recursos protegidos de la API.

Se envía en cada petición mediante el encabezado Authorization.

```http
Authorization: Bearer eyJhbGciOi...
```

Cuando el token expira, el usuario no necesita volver a iniciar sesión.

En su lugar utiliza el Refresh Token.

---

# Refresh Token

El Refresh Token permite obtener un nuevo Access Token sin volver a ingresar las credenciales.

Sin embargo, este proyecto no reutiliza indefinidamente el mismo Refresh Token.

Cada renovación genera uno completamente nuevo.

Este mecanismo se conoce como **Refresh Token Rotation**.

---

# Persistencia de sesiones

A diferencia de una implementación básica con JWT, cada Refresh Token queda registrado en la base de datos.

Esto permite conocer exactamente qué sesiones están activas.

```text
Usuario

↓

Refresh Token

↓

Session

↓

PostgreSQL
```

Cada sesión almacena información como:

- Usuario.
- Refresh Token.
- Fecha de expiración.
- Estado de revocación.
- Fecha de creación.

Gracias a esto es posible cerrar sesiones individuales o invalidar todas las sesiones de un usuario.

---

# Refresh Token Rotation

Cuando el cliente solicita un nuevo Access Token utilizando el Refresh Token, ocurre el siguiente proceso.

```text
Cliente

↓

POST /auth/refresh

↓

Validar Refresh Token

↓

Buscar sesión

↓

Verificar que siga activa

↓

Revocar la sesión actual

↓

Generar nuevos tokens

↓

Crear una nueva sesión

↓

Guardar en PostgreSQL

↓

Responder al cliente
```

Este mecanismo evita reutilizar indefinidamente el mismo Refresh Token y reduce considerablemente el riesgo en caso de robo de credenciales.

---

# Logout

Cuando un usuario decide cerrar sesión, el sistema no elimina el JWT.

Lo que hace es revocar la sesión asociada al Refresh Token.

```text
Cliente

↓

POST /auth/logout

↓

Buscar sesión

↓

Revocar sesión

↓

Guardar cambios
```

A partir de ese momento ese Refresh Token deja de ser válido.

---

# Logout de todas las sesiones

También es posible cerrar todas las sesiones activas de un usuario.

Esto resulta útil cuando:

- Se cambia la contraseña.
- Se detecta actividad sospechosa.
- El usuario pierde un dispositivo.

```text
Usuario

↓

POST /auth/logout-all

↓

Buscar sesiones

↓

Revocar todas

↓

Guardar cambios
```

---

# Roles

Además de autenticar usuarios, el sistema permite asignar un rol a cada uno.

Actualmente existen tres roles.

```text
ADMIN

MANAGER

USER
```

Estos roles serán utilizados por los módulos de autorización para restringir el acceso a determinadas operaciones.

---

# Seguridad

Durante la implementación se aplicaron distintas medidas para reforzar la seguridad.

- Contraseñas almacenadas utilizando bcrypt.
- JWT firmados mediante claves secretas.
- Validación de datos con Zod.
- Refresh Token Rotation.
- Persistencia de sesiones.
- Revocación de sesiones.
- Helmet para proteger los encabezados HTTP.
- CORS configurado para controlar el acceso entre dominios.

---

# ¿Por qué no utilizar únicamente JWT?

Una implementación basada únicamente en JWT presenta varias limitaciones.

Por ejemplo:

- No permite cerrar sesión realmente.
- No es posible invalidar un token antes de que expire.
- No existe control sobre las sesiones activas.
- Es difícil detectar reutilización de tokens.

Al incorporar persistencia de sesiones y Refresh Token Rotation, el sistema obtiene un mayor control sobre la autenticación sin perder las ventajas de JWT.

---

# ¿Qué aprendimos?

Durante esta etapa del proyecto conseguimos:

- Implementar autenticación basada en JWT.
- Gestionar sesiones persistentes.
- Incorporar Refresh Token Rotation.
- Permitir logout seguro.
- Preparar la aplicación para incorporar autorización mediante roles y permisos.
- Diseñar una base de autenticación preparada para aplicaciones de producción.

---
