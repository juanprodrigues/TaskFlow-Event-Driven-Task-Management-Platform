import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { CreateWorkspaceUseCase } from "../../application/use-cases/CreateWorkspaceUseCase";

import { createWorkspaceSchema } from "../validators/create-workspace.schema";
import { GetWorkspaceByIdUseCase } from "../../application/use-cases/GetWorkspaceByIdUseCase";

@injectable()
export class WorkspaceController {
  constructor(
    @inject("createWorkspaceUseCase")
    private readonly createWorkspaceUseCase: CreateWorkspaceUseCase,

    @inject("getWorkspaceByIdUseCase")
    private readonly getWorkspaceByIdUseCase: GetWorkspaceByIdUseCase,
  ) {}

  create = async (req: Request, res: Response) => {
    const data = createWorkspaceSchema.parse(req.body);

    const userId = req.user!.id;

    const workspace = await this.createWorkspaceUseCase.execute({
      name: data.name,

      description: data.description,

      ownerId: userId,
    });

    return res.status(201).json(workspace);
  };

  getById = async (req: Request, res: Response) => {

    const workspace = await this.getWorkspaceByIdUseCase.execute(req.params.id as string);

    return res.json(workspace);
  };
}

// NO publica eventos.

// Solo adapta HTTP -> Application
