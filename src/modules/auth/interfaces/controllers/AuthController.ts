import { Request, Response, NextFunction } from "express";

import { RegisterUseCase } from "../../application/usecases/RegisterUseCase";
import { LoginUseCase } from "../../application/usecases/LoginUseCase";

import { ApiResponse } from "../../../../shared/responses/ApiResponse";
import { RefreshTokenUseCase } from "../../application/usecases/RefreshTokenUseCase";
import { LogoutUseCase } from "../../application/usecases/LogoutUseCase";
import { LogoutAllUseCase } from "../../application/usecases/LogoutAllUseCase";

export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly logoutAllUseCase: LogoutAllUseCase,
  ) {
    this.logoutUseCase = logoutUseCase;
    this.logoutAllUseCase = logoutAllUseCase;
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.registerUseCase.execute(req.body);

      return res
        .status(201)
        .json(ApiResponse.success(user, "User registered successfully"));
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const tokens = await this.loginUseCase.execute(req.body);

      return res.json(ApiResponse.success(tokens, "Login successful"));
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshTokenDto = req.body;
      const tokens = await this.refreshTokenUseCase.execute(refreshTokenDto);

      return res.json(
        ApiResponse.success(tokens, "Token refreshed successfully"),
      );
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await this.logoutUseCase.execute(req.body);

      return res.json(ApiResponse.success(null, "Logged out successfully"));
    } catch (error) {
      next(error);
    }
  }

  async logoutAll(req: Request, res: Response, next: NextFunction) {
    try {
      await this.logoutAllUseCase.execute(req.user!.id);

      return res.json(ApiResponse.success(null, "All sessions revoked"));
    } catch (error) {
      next(error);
    }
  }
}