import { inject, injectable } from "tsyringe";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

@injectable()
export class ListUsersUseCase {

    constructor(
        @inject("repository")
        private readonly repository: UserRepository
    ) {}

    async execute(): Promise<User[]> {

        return this.repository.findAll();

    }

}