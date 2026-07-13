import { Role } from "@/modules/users/domain/enums/Role";

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: Role;
}