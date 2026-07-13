import { UserRepository } from "../../domain/repositories/UserRepository";
import { UpdateUserDto } from "../dto/UpdateUserDto";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateUserUseCase {

    constructor(
        @inject("repository")
        private readonly repository: UserRepository
    ) {}

    async execute(id: string, dto: UpdateUserDto) {

        const user = await this.repository.findById(id);

        if (!user) {
            throw new Error("User not found");
        }

        user.name = dto.name ?? user.name;
        user.email = dto.email ?? user.email;
        user.password = dto.password ?? user.password;

        return this.repository.update(user);

    }

}