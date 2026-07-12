import { UnauthorizedError } from "../../../../shared/errors";

import { SessionRepository } from "../../domain/repositories/SessionRepository";

import { TokenService } from "../../domain/services/TokenService";

import { Session } from "../../domain/entities/Session";

import { RefreshTokenDto } from "../dto/RefreshTokenDto";

import { AuthResponseDto } from "../dto/AuthResponseDto";
import { UserRepository } from "@/modules/users/domain/repositories/UserRepository";

export class RefreshTokenUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(dto: RefreshTokenDto): Promise<AuthResponseDto> {

    const payload = this.tokenService.verifyRefreshToken(dto.refreshToken);

    if (!payload || typeof payload !== "object" || !("sub" in payload)) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const session = await this.sessionRepository.findByRefreshToken(
      dto.refreshToken,
    );

    if (!session) {
      throw new UnauthorizedError("Session not found");
    }

    if (!session.isActive()) {
      throw new UnauthorizedError("Session expired or revoked");
    }

    // invalidamos el refresh token anterior

    session.revoke();

    await this.sessionRepository.update(session);

    const userId = payload.sub as string;
    const user = await this.userRepository.findById(userId);
    if (user == null) {
      throw new UnauthorizedError("User dont find");
    }

    const newAccessToken = this.tokenService.generateAccessToken({
      sub: user.id,
      email: user.email,
    });

    const newRefreshToken = this.tokenService.generateRefreshToken(userId);

    const newSession = Session.create(
      newRefreshToken,

      userId,

      this.tokenService.getRefreshTokenExpiration(),
    );

    await this.sessionRepository.create(newSession);

    return {
      accessToken: newAccessToken,

      refreshToken: newRefreshToken,
    };
  }
}
