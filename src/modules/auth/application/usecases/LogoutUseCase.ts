import { UnauthorizedError } from "../../../../shared/errors";

import { SessionRepository } from "../../domain/repositories/SessionRepository";

import { LogoutDto } from "../dto/LogoutDto";

export class LogoutUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(dto: LogoutDto): Promise<void> {
    const session = await this.sessionRepository.findByRefreshToken(
      dto.refreshToken,
    );

    if (!session) {
      throw new UnauthorizedError("Session not found");
    }

    session.revoke();

    await this.sessionRepository.update(session);
  }
}
