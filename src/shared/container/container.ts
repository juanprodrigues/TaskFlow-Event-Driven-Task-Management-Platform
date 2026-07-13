import { container } from "tsyringe";

// Repositories
import { PrismaUserRepository } from "@/modules/users/infrastructure/repositories/PrismaUserRepository";
import { PrismaSessionRepository } from "@/modules/auth/infrastructure/repositories/PrismaSessionRepository";

import { UserRepository } from "@/modules/users/domain/repositories/UserRepository";
import { SessionRepository } from "@/modules/auth/domain/repositories/SessionRepository";

// Use Cases Auth
import { RegisterUseCase } from "@/modules/auth/application/usecases/RegisterUseCase";
import { LoginUseCase } from "@/modules/auth/application/usecases/LoginUseCase";
import { RefreshTokenUseCase } from "@/modules/auth/application/usecases/RefreshTokenUseCase";
import { LogoutUseCase } from "@/modules/auth/application/usecases/LogoutUseCase";
import { LogoutAllUseCase } from "@/modules/auth/application/usecases/LogoutAllUseCase";

// Use Cases Users
import { CreateUserUseCase } from "@/modules/users/application/usecases/CreateUserUseCase";
import { ListUsersUseCase } from "@/modules/users/application/usecases/ListUsersUseCase";
import { FindUserByIdUseCase } from "@/modules/users/application/usecases/FindUserByIdUseCase";
import { UpdateUserUseCase } from "@/modules/users/application/usecases/UpdateUserUseCase";
import { DeleteUserUseCase } from "@/modules/users/application/usecases/DeleteUserUseCase";

// Controllers
import { AuthController } from "@/modules/auth/interfaces/controllers/AuthController";
import { UserController } from "@/modules/users/infrastructure/controllers/UserController";
import { HealthController } from "@/modules/health/interfaces/controllers/HealthController";

// Services
import { TokenService } from "@/modules/auth/domain/services/TokenService";
import { JwtTokenService } from "@/modules/auth/domain/services/JwtTokenService";
import { BcryptHashService } from "@/modules/auth/domain/services/BcryptHashService";



// =======================
// REPOSITORIES
// =======================

container.registerSingleton<UserRepository>(
  "userRepository",
  PrismaUserRepository,
);

container.registerSingleton<SessionRepository>(
  "sessionRepository",
  PrismaSessionRepository,
);


// =======================
// SERVICES
// =======================

container.registerSingleton<TokenService>(
  "tokenService",
  JwtTokenService,
);

container.registerSingleton<BcryptHashService>(
  "hashService",
  BcryptHashService,
);

// =======================
// AUTH USE CASES
// =======================

container.registerSingleton(
  "registerUseCase",
  RegisterUseCase,
);

container.registerSingleton(
  "loginUseCase",
  LoginUseCase,
);

container.registerSingleton(
  "refreshTokenUseCase",
  RefreshTokenUseCase,
);

container.registerSingleton(
  "logoutUseCase",
  LogoutUseCase,
);

container.registerSingleton(
  "logoutAllUseCase",
  LogoutAllUseCase,
);


// =======================
// USER USE CASES
// =======================

container.registerSingleton(
  "createUserUseCase",
  CreateUserUseCase,
);

container.registerSingleton(
  "listUsersUseCase",
  ListUsersUseCase,
);

container.registerSingleton(
  "findUserByIdUseCase",
  FindUserByIdUseCase,
);

container.registerSingleton(
  "updateUserUseCase",
  UpdateUserUseCase,
);

container.registerSingleton(
  "deleteUserUseCase",
  DeleteUserUseCase,
);


// =======================
// CONTROLLERS
// =======================

container.registerSingleton(
  AuthController,
);

container.registerSingleton(
  UserController,
);

container.registerSingleton(
  HealthController,
);


export { container };