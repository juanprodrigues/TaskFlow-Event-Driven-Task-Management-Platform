import { Request, Response } from "express";
import { GetHealthUseCase } from "../../application/usecases/GetHealthUseCase";

export class HealthController {

    constructor(
        private readonly getHealthUseCase: GetHealthUseCase
    ) {}

    async handle(req: Request, res: Response) {

        const response = this.getHealthUseCase.execute();

        return res.json(response);

    }

}