import { inject, injectable } from "tsyringe";

import { PrismaClient } from "@prisma/client";

import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "@/modules/users/domain/entities/User";

import { toDomainRole } from "../../application/mappers/UserMapper";

@injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    @inject(PrismaClient)
    private readonly prisma: PrismaClient,
  ) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return User.restore({
      ...user,
      role: toDomainRole(user.role),
    });
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return User.restore({
      ...user,
      role: toDomainRole(user.role),
    });
  }
}
