import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class FindUserByIdUseCase {

    constructor(
        private readonly repository: UserRepository
    ) {}

    async execute(id: string): Promise<User | null> {

        return this.repository.findById(id);

    }

}