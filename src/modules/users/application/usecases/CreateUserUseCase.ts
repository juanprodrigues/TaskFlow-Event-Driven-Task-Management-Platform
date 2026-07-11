import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { CreateUserDto } from "../dto/CreateUserDto";

export class CreateUserUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(dto: CreateUserDto): Promise<User> {

        const existingUser = await this.userRepository.findByEmail(dto.email);

        if (existingUser) {
            throw new Error("User already exists");
        }

        const user = new User(
            crypto.randomUUID(),
            dto.name,
            dto.email,
            dto.password,
            new Date()
        );

        return this.userRepository.create(user);

    }

}