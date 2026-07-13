import { Request, Response } from "express";
import { GetHealthUseCase } from "../../application/usecases/GetHealthUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class HealthController {

    constructor(
        @inject("getHealthUseCase")
        private readonly getHealthUseCase: GetHealthUseCase
    ) {}

    async handle(req: Request, res: Response) {

        const response = this.getHealthUseCase.execute();

        return res.json(response);

    }

}