import { Request, Response, NextFunction } from "express";

import { CreateUserUseCase } from "../../application/usecases/CreateUserUseCase";
import { FindUserByIdUseCase } from "../../application/usecases/FindUserByIdUseCase";
import { ListUsersUseCase } from "../../application/usecases/ListUsersUseCase";
import { UpdateUserUseCase } from "../../application/usecases/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../application/usecases/DeleteUserUseCase";
import { ApiResponse } from "@/shared/responses/ApiResponse";
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

            return res.status(201).json(
                ApiResponse.success(
                    user,
                    "User created successfully"
                )
            );

        } catch (error) {

            next(error);

        }

    }

    async findById(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params;

            if (Array.isArray(id)) {
                throw new Error("El parámetro 'id' es inválido.");
            }

            const user = await this.findUserByIdUseCase.execute(id);

            return res.json(

                ApiResponse.success(

                    user,

                    "User retrieved successfully"

                )

            );
        } catch (error) {
            next(error);

        }

    }

    async list(req: Request, res: Response, next: NextFunction) {

        try {

            const users = await this.listUsersUseCase.execute();

            return res.json(

                ApiResponse.success(

                    users,

                    "Users retrieved successfully"

                )

            );

        } catch (error) {

            next(error);

        }

    }


    
    async update(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params;

            if (typeof id !== "string") {
            return next(new Error("El parámetro 'id' es inválido."));
            }

            const user = await this.updateUserUseCase.execute(id, req.body);

            return res.json(

                ApiResponse.success(

                    user,

                    "User updated successfully"

                )

            );

        } catch (error) {

            next(error);

        }

    }

    async delete(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params;

            if (Array.isArray(id)) {
                throw new Error("El parámetro 'id' es inválido.");
            }
            return res.json(

                ApiResponse.success(

                    null,

                    "User deleted successfully"

                )

            );

        } catch (error) {

            next(error);

        }

    }

}