import { inject, injectable } from "tsyringe";
import { UserRepository } from "../../domain/repositories/UserRepository";

@injectable()
export class DeleteUserUseCase {

    constructor(
        @inject("repository")
        private readonly repository: UserRepository
    ) {}

    async execute(id: string): Promise<void> {

        const user = await this.repository.findById(id);

        if (!user) {
            throw new Error("User not found");
        }

        await this.repository.delete(id);

    }

}