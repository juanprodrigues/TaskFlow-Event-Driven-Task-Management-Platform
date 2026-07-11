import { Request, Response } from "express";
import { GetHealthUseCase } from "../../application/usecases/GetHealthUseCase";

export class HealthController {

    async handle(req: Request, res: Response): Promise<Response> {

        const useCase = new GetHealthUseCase();

        const result = useCase.execute();

        return res.status(200).json(result);

    }

}