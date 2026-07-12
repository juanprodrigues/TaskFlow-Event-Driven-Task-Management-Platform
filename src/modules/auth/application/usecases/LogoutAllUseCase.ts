import { SessionRepository } from "../../domain/repositories/SessionRepository";

export class LogoutAllUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(userId: string): Promise<void> {
    await this.sessionRepository.revokeAll(userId);
  }
}
