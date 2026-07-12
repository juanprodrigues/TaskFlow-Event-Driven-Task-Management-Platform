import { PrismaUserRepository } from "@/modules/users/infrastructure/repositories/PrismaUserRepository";
import { BcryptHashService } from "../domain/services/BcryptHashService";
import { JwtTokenService } from "../domain/services/JwtTokenService";
import { AuthController } from "../interfaces/controllers/AuthController";
import { RegisterUseCase } from "../application/usecases/RegisterUseCase";
import { LoginUseCase } from "../application/usecases/LoginUseCase";
import { PrismaSessionRepository } from "../infrastructure/repositories/PrismaSessionRepository";
import { RefreshTokenUseCase } from "../application/usecases/RefreshTokenUseCase";
import { LogoutAllUseCase } from "../application/usecases/LogoutAllUseCase";
import { LogoutUseCase } from "../application/usecases/LogoutUseCase";

export class AuthFactory {
  static createController() {
    const userRepository = new PrismaUserRepository();

    const hashService = new BcryptHashService();

    const tokenService = new JwtTokenService();

    const sessionRepository = new PrismaSessionRepository();
    
    // const logoutUseCase = new LogoutUseCase(sessionRepository);
    // const logoutAllUseCase = new LogoutAllUseCase(sessionRepository);

    return new AuthController(
      new RegisterUseCase(userRepository, hashService),

      new LoginUseCase(
        userRepository,
        sessionRepository,
        hashService,
        tokenService,
      ),
      new RefreshTokenUseCase(userRepository, sessionRepository, tokenService),
      new LogoutUseCase(sessionRepository),
      new LogoutAllUseCase(sessionRepository)
    );
  }
}
