# Inyección de Dependencias

A medida que una aplicación crece, la creación manual de objetos comienza a generar un fuerte acoplamiento entre las distintas capas del sistema.

Uno de los objetivos de este proyecto fue evitar ese problema desde el inicio.

Para lograrlo se implementó **Dependency Injection** utilizando **TSyringe**.

---

# ¿Qué problema resuelve?

Supongamos un caso de uso de autenticación.

Sin inyección de dependencias tendríamos algo como esto:

```ts
const repository = new PrismaUserRepository();
const hashService = new BcryptHashService();
const tokenService = new JwtTokenService();

const loginUseCase = new LoginUseCase(
    repository,
    hashService,
    tokenService
);
```

Aunque funciona, aparecen varios problemas:

- El código conoce las implementaciones concretas.
- Cambiar una dependencia requiere modificar el código.
- Es difícil realizar pruebas unitarias.
- La creación de objetos termina distribuida por toda la aplicación.

---

# La solución

Con TSyringe las dependencias son administradas por un contenedor.

```text
Application

↓

Container

↓

Use Case

↓

Repository

↓

Prisma
```

Ahora el caso de uso únicamente declara lo que necesita.

```ts
@injectable()
export class LoginUseCase {

    constructor(

        @inject("UserRepository")
        private readonly userRepository: UserRepository,

        @inject("SessionRepository")
        private readonly sessionRepository: SessionRepository,

        @inject("HashService")
        private readonly hashService: HashService,

        @inject("TokenService")
        private readonly tokenService: TokenService

    ) {}

}
```

El caso de uso ya no sabe qué implementación concreta está utilizando.

Simplemente conoce las interfaces.

---

# Registro de dependencias

Todas las implementaciones se registran en un único lugar.

```text
shared/

container/

container.ts
```

Ejemplo:

```ts
container.registerSingleton<UserRepository>(
    "UserRepository",
    PrismaUserRepository
);

container.registerSingleton<TokenService>(
    "TokenService",
    JwtTokenService
);
```

De esta manera, cualquier clase que solicite una dependencia recibirá automáticamente la implementación registrada.

---

# Resolución de dependencias

Cuando un controlador necesita un caso de uso, el contenedor se encarga de construir toda la cadena de dependencias.

```text
Controller

↓

LoginUseCase

↓

UserRepository

↓

PrismaUserRepository
```

En el código:

```ts
const controller = container.resolve(AuthController);
```

No es necesario crear manualmente ninguno de los objetos.

---

# Beneficios

Implementar Dependency Injection aporta varias ventajas.

## Menor acoplamiento

Los casos de uso dependen de interfaces y no de implementaciones concretas.

Esto facilita reemplazar tecnologías sin modificar la lógica de negocio.

---

## Mejor mantenibilidad

Toda la configuración de dependencias se encuentra centralizada.

Si una implementación cambia, únicamente es necesario modificar el contenedor.

---

## Mayor facilidad para realizar pruebas

Durante un test podemos sustituir fácilmente cualquier implementación.

Por ejemplo:

```ts
container.register(
    "UserRepository",
    {
        useValue: new FakeUserRepository()
    }
);
```

El caso de uso seguirá funcionando exactamente igual.

---

## Escalabilidad

A medida que el proyecto crezca con nuevos módulos como:

- Workspace
- Projects
- Boards
- Tasks
- Notifications

no será necesario modificar la forma en que se crean los objetos.

Todos utilizarán el mismo mecanismo de resolución.

---

# ¿Por qué TSyringe?

Existen múltiples bibliotecas para implementar Dependency Injection en Node.js.

Se eligió TSyringe porque:

- Es ligera.
- Tiene integración nativa con TypeScript.
- Utiliza decoradores.
- Posee una curva de aprendizaje baja.
- Es suficiente para proyectos de tamaño pequeño y mediano.

Además, el patrón utilizado es fácilmente adaptable a otros contenedores de inversión de control en caso de ser necesario.

---

# Flujo completo

```text
HTTP Request

↓

Controller

↓

Container

↓

Use Case

↓

Repository Interface

↓

Prisma Repository

↓

PostgreSQL
```

Cada componente conoce únicamente aquello que necesita para cumplir su responsabilidad.

---

# ¿Qué aprendimos?

Con la incorporación de Dependency Injection conseguimos:

- Desacoplar completamente la creación de objetos.
- Centralizar la configuración de dependencias.
- Facilitar la realización de pruebas unitarias.
- Reducir el acoplamiento entre módulos.
- Preparar la arquitectura para seguir creciendo sin aumentar la complejidad.

---
