import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { AddMemberToWorkspaceUseCase } from "../../application/use-cases/AddMemberToWorkspaceUseCase";
import { addWorkspaceMemberSchema } from "../validators/add-workspace-member.schema";

@injectable()
export class WorkspaceMemberController {
  constructor(
    @inject("AddMemberToWorkspaceUseCase")
    private readonly addMemberUseCase: AddMemberToWorkspaceUseCase,
  ) {}

  addMember = async (req: Request<{ workspaceId: string }>, res: Response) => {
    const body = addWorkspaceMemberSchema.parse(req.body);

    await this.addMemberUseCase.execute({
      workspaceId: req.params.workspaceId,

      requesterId: req.user!.id,

      email: body.email,
    });

    return res.status(201).send();
  };
}
