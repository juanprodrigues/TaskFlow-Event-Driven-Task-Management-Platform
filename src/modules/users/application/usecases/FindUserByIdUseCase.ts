import { inject, injectable } from "tsyringe";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

@injectable()
export class FindUserByIdUseCase {

    constructor(
        @inject("repository")
        private readonly repository: UserRepository
    ) {}

    async execute(id: string): Promise<User | null> {

        return this.repository.findById(id);

    }

}