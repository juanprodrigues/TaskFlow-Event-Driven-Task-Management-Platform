import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { prisma } from "../../../../shared/database/prisma";
import { UserMapper } from "../../application/mappers/UserMapper";

export class PrismaUserRepository implements UserRepository {



    async create(user: User): Promise<User> {

        const createdUser = await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }
        });

        return new User(
            createdUser.id,
            createdUser.name,
            createdUser.email,
            createdUser.password,
            UserMapper.mapPrismaRoleToDomain(createdUser.role),
            createdUser.createdAt
        );
    }

    async findById(id: string): Promise<User | null> {

        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return null;
        }

        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            UserMapper.mapPrismaRoleToDomain(user.role),
            user.createdAt
        );
    }

    async findByEmail(email: string): Promise<User | null> {

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return null;
        }

        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            UserMapper.mapPrismaRoleToDomain(user.role),
            user.createdAt
        );
    }

    async findAll(): Promise<User[]> {

        const users = await prisma.user.findMany();

        return users.map(user =>
            new User(
                user.id,
                user.name,
                user.email,
                user.password,
                UserMapper.mapPrismaRoleToDomain(user.role),
                user.createdAt
            )
        );
    }

    async update(user: User): Promise<User> {

        const updated = await prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        });

        return new User(
            updated.id,
            updated.name,
            updated.email,
            updated.password,
            UserMapper.mapPrismaRoleToDomain(updated.role),
            updated.createdAt
        );
    }

    async delete(id: string): Promise<void> {

        await prisma.user.delete({
            where: { id }
        });

    }
}