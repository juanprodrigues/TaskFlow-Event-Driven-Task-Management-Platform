import { User } from "@/modules/users/domain/entities/User";

export interface UserRepository {

    findById(
        id: string
    ): Promise<User | null>;

    findByEmail(
        email: string
    ): Promise<User | null>;

}