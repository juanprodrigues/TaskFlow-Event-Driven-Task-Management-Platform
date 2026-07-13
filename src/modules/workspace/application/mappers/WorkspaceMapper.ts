import { Workspace } from "../../domain/entities/Workspace";

import { CreateWorkspaceResponseDTO } from "../dto/CreateWorkspaceResponseDTO";

export class WorkspaceMapper {
  static toResponse(workspace: Workspace): CreateWorkspaceResponseDTO {
    const props = workspace.getProps();

    return {
      id: workspace.getId(),

      name: props.name.getValue(),

      description: props.description,

      ownerId: props.ownerId,

      createdAt: props.createdAt,
    };
  }
}
