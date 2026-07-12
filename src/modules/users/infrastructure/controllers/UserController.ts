import { Request, Response, NextFunction } from "express";

import { CreateUserUseCase } from "../../application/usecases/CreateUserUseCase";
import { FindUserByIdUseCase } from "../../application/usecases/FindUserByIdUseCase";
import { ListUsersUseCase } from "../../application/usecases/ListUsersUseCase";
import { UpdateUserUseCase } from "../../application/usecases/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../application/usecases/DeleteUserUseCase";
// lo idea es controllers

// CreateUserController.ts

// ListUsersController.ts

// UpdateUserController.ts

// DeleteUserController.ts

// FindUserByIdController.ts
export class UserController {

    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
        private readonly listUsersUseCase: ListUsersUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase
    ) {}

    async create(req: Request, res: Response, next: NextFunction) {

        try {

            const user = await this.createUserUseCase.execute(req.body);

            return res.status(201).json(user);

        } catch (error) {

            next(error);

        }

    }

    async findById(req: Request, res: Response, next: NextFunction) {

        try {

            const user = await this.findUserByIdUseCase.execute(req.params.id);

            return res.json(user);

        } catch (error) {

            next(error);

        }

    }

    async list(req: Request, res: Response, next: NextFunction) {

        try {

            const users = await this.listUsersUseCase.execute();

            return res.json(users);

        } catch (error) {

            next(error);

        }

    }

    async update(req: Request, res: Response, next: NextFunction) {

        try {

            const user = await this.updateUserUseCase.execute(
                req.params.id,
                req.body
            );

            return res.json(user);

        } catch (error) {

            next(error);

        }

    }

    async delete(req: Request, res: Response, next: NextFunction) {

        try {

            await this.deleteUserUseCase.execute(req.params.id);

            return res.status(204).send();

        } catch (error) {

            next(error);

        }

    }

}