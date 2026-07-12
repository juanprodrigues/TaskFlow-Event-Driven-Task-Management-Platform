import { Request, Response, NextFunction } from "express";

import { RegisterUseCase } from "../../application/usecases/RegisterUseCase";
import { LoginUseCase } from "../../application/usecases/LoginUseCase";

import { ApiResponse } from "../../../../shared/responses/ApiResponse";

export class AuthController {

    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase
    ) {}

    async register(req: Request, res: Response, next: NextFunction) {

        try {

            const user =
                await this.registerUseCase.execute(req.body);

            return res.status(201).json(

                ApiResponse.success(
                    user,
                    "User registered successfully"
                )

            );

        } catch (error) {

            next(error);

        }

    }

    async login(req: Request, res: Response, next: NextFunction) {

        try {

            const tokens =
                await this.loginUseCase.execute(req.body);

            return res.json(

                ApiResponse.success(
                    tokens,
                    "Login successful"
                )

            );

        } catch (error) {

            next(error);

        }

    }

}