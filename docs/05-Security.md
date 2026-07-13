# Seguridad

La seguridad fue considerada desde las primeras etapas del proyecto y no como una funcionalidad agregada al final.

Cada decisión tomada busca reducir riesgos comunes en aplicaciones web modernas sin aumentar innecesariamente la complejidad del sistema.

Actualmente la aplicación incorpora múltiples mecanismos de protección que trabajan en conjunto.

---

# Contraseñas

Las contraseñas nunca se almacenan en texto plano.

Antes de persistirse en la base de datos son procesadas mediante **bcrypt**, generando un hash irreversible.

```text
Contraseña

↓

bcrypt

↓

Hash

↓

PostgreSQL
```

Esto significa que, incluso si la base de datos fuera comprometida, las contraseñas originales no podrían recuperarse directamente.

---

# Autenticación mediante JWT

La autenticación se basa en dos tipos de tokens.

- Access Token
- Refresh Token

Cada uno cumple una función específica.

```text
Login

↓

Access Token

↓

Acceso a la API
```

El Access Token tiene una vida útil corta para reducir el impacto de una posible filtración.

---

# Refresh Token Rotation

Una de las principales medidas de seguridad implementadas es la rotación de Refresh Tokens.

En lugar de reutilizar siempre el mismo token, cada renovación genera uno completamente nuevo.

```text
Refresh Token A

↓

Validación

↓

Revocar sesión

↓

Crear nueva sesión

↓

Refresh Token B
```

Si un Refresh Token ya fue utilizado anteriormente, deja de ser válido.

Este mecanismo reduce considerablemente el riesgo de reutilización de tokens comprometidos.

---

# Persistencia de sesiones

Cada Refresh Token queda registrado en PostgreSQL.

Esto permite controlar todas las sesiones activas de un usuario.

```text
Usuario

↓

Session

↓

PostgreSQL
```

Gracias a esto el sistema puede:

- Revocar sesiones.
- Cerrar sesión correctamente.
- Invalidar todas las sesiones de un usuario.
- Detectar sesiones expiradas.

---

# Validación de datos

Todas las entradas provenientes del cliente son validadas mediante **Zod**.

```text
Request

↓

Zod

↓

Controller
```

Esto evita procesar datos inválidos y reduce la probabilidad de errores en tiempo de ejecución.

---

# Encabezados HTTP

La aplicación utiliza **Helmet** para incorporar automáticamente distintos encabezados de seguridad.

Entre otras medidas, ayuda a proteger frente a ataques relacionados con la configuración del navegador.

---

# CORS

El acceso desde otros dominios está controlado mediante CORS.

Esto permite definir qué clientes están autorizados a consumir la API.

---

# Manejo centralizado de errores

Todos los errores son procesados por un middleware global.

```text
Controller

↓

Throw Error

↓

Error Middleware

↓

Respuesta HTTP
```

Esto mantiene respuestas consistentes y evita exponer información sensible al cliente.

---

# Roles

El sistema incorpora un modelo de autorización basado en roles.

Actualmente existen tres perfiles.

```text
ADMIN

MANAGER

USER
```

Cada endpoint puede restringir el acceso según el rol del usuario autenticado.

En futuras versiones se incorporará un sistema de permisos más granular.

---

# Registro de actividad

Cada petición queda registrada mediante **Pino**.

Esto facilita:

- Auditoría.
- Diagnóstico de errores.
- Monitoreo.
- Observabilidad.

---

# Buenas prácticas aplicadas

Durante el desarrollo se aplicaron las siguientes prácticas:

- Contraseñas cifradas.
- JWT firmados.
- Refresh Token Rotation.
- Persistencia de sesiones.
- Validación de entrada.
- Separación entre autenticación y autorización.
- Manejo centralizado de errores.
- Logging estructurado.
- Arquitectura desacoplada.

---

# Próximas mejoras

El proyecto continuará incorporando nuevas medidas de seguridad.

Entre ellas:

- Rate Limiting.
- Protección frente a fuerza bruta.
- Confirmación de correo electrónico.
- Recuperación de contraseña.
- Autenticación de dos factores (2FA).
- Gestión de permisos basada en políticas.
- Auditoría mediante MongoDB.

---

# ¿Qué aprendimos?

La seguridad no depende de una única tecnología.

Es el resultado de combinar distintas estrategias que trabajan de manera complementaria.

Durante esta etapa conseguimos construir una base sólida que puede evolucionar hacia un sistema de autenticación y autorización preparado para aplicaciones reales.

---
