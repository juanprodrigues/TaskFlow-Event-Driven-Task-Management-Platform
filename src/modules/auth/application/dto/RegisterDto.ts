import { Role } from "@/modules/users/domain/enums/Role";

export interface RegisterDto {

    name: string;

    email: string;

    password: string;

    role: Role;
}