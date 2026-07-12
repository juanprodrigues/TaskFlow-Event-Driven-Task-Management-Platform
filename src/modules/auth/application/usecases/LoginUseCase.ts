import { UnauthorizedError } from "../../../../shared/errors";

import { UserRepository } from "../../../users/domain/repositories/UserRepository";

import { LoginDto } from "../dto/LoginDto";

import { HashService } from "../../domain/services/HashService";

import { TokenService } from "../../domain/services/TokenService";

import { AuthResponseDto } from "../dto/AuthResponseDto";

export class LoginUseCase {

    constructor(
        private readonly repository: UserRepository,
        private readonly hashService: HashService,
        private readonly tokenService: TokenService
    ) {}

    async execute(
        dto: LoginDto
    ): Promise<AuthResponseDto> {

        const user =
            await this.repository.findByEmail(dto.email);

        if (!user) {
            throw new UnauthorizedError("Invalid credentials");
        }

        const validPassword =
            await this.hashService.compare(
                dto.password,
                user.password
            );

        if (!validPassword) {
            throw new UnauthorizedError("Invalid credentials");
        }

        return {
            accessToken:
                this.tokenService.generateAccessToken(user.id),

            refreshToken:
                this.tokenService.generateRefreshToken(user.id)
        };

    }

}