import { SessionRepository } from "../../domain/repositories/SessionRepository";
import { injectable, inject } from "tsyringe";

@injectable()
export class LogoutAllUseCase {

  constructor(
    @inject("sessionRepository")
    private readonly sessionRepository: SessionRepository
) {}

  async execute(userId: string): Promise<void> {
    await this.sessionRepository.revokeAll(userId);
  }
}
