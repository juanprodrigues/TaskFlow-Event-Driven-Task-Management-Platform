import { Workspace } from "../../domain/entities/Workspace";

import { WorkspaceResponseDTO } from "../dto/WorkspaceResponseDTO";

export class WorkspaceMapper {
  static toResponse(workspace: Workspace): WorkspaceResponseDTO {
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
