import { PrismaUserRepository } from "@/modules/users/infrastructure/repositories/PrismaUserRepository";
import { BcryptHashService } from "../domain/services/BcryptHashService";
import { JwtTokenService } from "../domain/services/JwtTokenService";
import { AuthController } from "../interfaces/controllers/AuthController";
import { RegisterUseCase } from "../application/usecases/RegisterUseCase";
import { LoginUseCase } from "../application/usecases/LoginUseCase";

export class AuthFactory {

    static createController() {

        const repository = new PrismaUserRepository();

        const hashService = new BcryptHashService();

        const tokenService = new JwtTokenService();

        return new AuthController(

            new RegisterUseCase(
                repository,
                hashService
            ),

            new LoginUseCase(
                repository,
                hashService,
                tokenService
            )

        );

    }

}