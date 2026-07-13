import { User } from "../../domain/entities/User";
import { UserResponseDto } from "../dto/UserResponseDto";
import { Role as PrismaRole } from "@prisma/client";
import { Role } from "../../domain/enums/Role";

export class UserMapper {
  static toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  static mapPrismaRoleToDomain(role: PrismaRole): Role {
    return role as Role;
  }
}
