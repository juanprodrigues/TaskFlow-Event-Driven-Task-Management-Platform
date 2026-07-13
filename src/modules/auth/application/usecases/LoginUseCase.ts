import { UnauthorizedError } from "../../../../shared/errors";

import { UserRepository } from "../../../users/domain/repositories/UserRepository";

import { SessionRepository } from "../../domain/repositories/SessionRepository";

import { HashService } from "../../domain/services/HashService";
import { TokenService } from "../../domain/services/TokenService";

import { LoginDto } from "../dto/LoginDto";
import { AuthResponseDto } from "../dto/AuthResponseDto";

import { Session } from "../../domain/entities/Session";
import { inject, injectable } from "tsyringe";

@injectable()
export class LoginUseCase {

    constructor(
        @inject("userRepository")
        private readonly userRepository: UserRepository,
        @inject("sessionRepository")
        private readonly sessionRepository: SessionRepository,
        @inject("hashService")
        private readonly hashService: HashService,
        @inject("tokenService")
        private readonly tokenService: TokenService
    ) {}

    async execute(dto: LoginDto): Promise<AuthResponseDto> {

        const user = await this.userRepository.findByEmail(dto.email);

        if (!user) {
            throw new UnauthorizedError("Invalid credentials");
        }

        const passwordMatches = await this.hashService.compare(
            dto.password,
            user.password
        );

        if (!passwordMatches) {
            throw new UnauthorizedError("Invalid credentials");
        }

        const accessToken = this.tokenService.generateAccessToken({
            sub: user.id,
            email: user.email
        });
        const refreshToken = this.tokenService.generateRefreshToken(user.id);

        const session = Session.create(
            refreshToken,
            user.id,
            this.tokenService.getRefreshTokenExpiration()
        );

        await this.sessionRepository.create(session);

        return {
            accessToken,
            refreshToken
        };
    }

}