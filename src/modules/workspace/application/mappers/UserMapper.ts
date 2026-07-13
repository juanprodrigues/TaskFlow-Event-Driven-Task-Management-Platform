import { Role } from "@/modules/users/domain/enums/Role";
import { Role as PrismaRole } from "@prisma/client";

export const toDomainRole = (role: PrismaRole): Role => {
  switch (role) {
    case PrismaRole.ADMIN:
      return Role.ADMIN;
    case PrismaRole.MANAGER:
      return Role.MANAGER;
    case PrismaRole.USER:
      return Role.USER;
  }
};
