import { CreateUserUseCase } from "../application/usecases/CreateUserUseCase";
import { DeleteUserUseCase } from "../application/usecases/DeleteUserUseCase";
import { FindUserByIdUseCase } from "../application/usecases/FindUserByIdUseCase";
import { ListUsersUseCase } from "../application/usecases/ListUsersUseCase";
import { UpdateUserUseCase } from "../application/usecases/UpdateUserUseCase";
import { UserController } from "../infrastructure/controllers/UserController";
import { PrismaUserRepository } from "../infrastructure/repositories/PrismaUserRepository";

export class UserFactory {

    static createController() {

        const repository = new PrismaUserRepository();

        return new UserController(

            new CreateUserUseCase(repository),

            new FindUserByIdUseCase(repository),

            new ListUsersUseCase(repository),

            new UpdateUserUseCase(repository),

            new DeleteUserUseCase(repository)

        );

    }

}