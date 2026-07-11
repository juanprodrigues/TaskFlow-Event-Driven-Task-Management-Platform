import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class ListUsersUseCase {

    constructor(
        private readonly repository: UserRepository
    ) {}

    async execute(): Promise<User[]> {

        return this.repository.findAll();

    }

}