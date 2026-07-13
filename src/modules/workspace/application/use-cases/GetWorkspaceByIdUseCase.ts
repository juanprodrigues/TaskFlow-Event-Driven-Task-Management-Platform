import { inject, injectable } from "tsyringe";

import { WorkspaceRepository } from "../../domain/repositories/WorkspaceRepository";

import { WorkspaceMapper } from "../mappers/WorkspaceMapper";

import { WorkspaceResponseDTO } from "../dto/WorkspaceResponseDTO";
import { NotFoundError } from "@/shared/errors";



@injectable()
export class GetWorkspaceByIdUseCase {
  constructor(
    @inject("workspaceRepository")
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  async execute(id: string): Promise<WorkspaceResponseDTO> {
    const workspace = await this.workspaceRepository.findById(id);

    if (!workspace) {
      throw new NotFoundError("Workspace not found");
    }

    return WorkspaceMapper.toResponse(workspace);
  }
}
