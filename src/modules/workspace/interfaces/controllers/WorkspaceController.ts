import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { CreateWorkspaceUseCase } from "../../application/use-cases/CreateWorkspaceUseCase";

import { createWorkspaceSchema } from "../validators/create-workspace.schema";

@injectable()
export class WorkspaceController {
  constructor(
    @inject("createWorkspaceUseCase")
    private readonly createWorkspaceUseCase: CreateWorkspaceUseCase,
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
}

// NO publica eventos.

// Solo adapta HTTP -> Application