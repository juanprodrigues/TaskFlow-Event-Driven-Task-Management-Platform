import { ConflictError } from "../../../../shared/errors";
import { User } from "../../../users/domain/entities/User";
import { UserRepository } from "../../../users/domain/repositories/UserRepository";
import { RegisterDto } from "../dto/RegisterDto";
import { HashService } from "../../domain/services/HashService";

export class RegisterUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashService: HashService
    ) {}

    async execute(dto: RegisterDto): Promise<User> {

        const existingUser =
            await this.userRepository.findByEmail(dto.email);

        if (existingUser) {
            throw new ConflictError("Email already registered");
        }

        const hashedPassword =
            await this.hashService.hash(dto.password);

        const user = User.create(
            dto.name,
            dto.email,
            hashedPassword
        );

        return this.userRepository.create(user);

    }

}