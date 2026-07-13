import { Entity } from "@/shared/domain/entities/Entity";
import { WorkspaceRole } from "../value-objects/WorkspaceRole";

export interface WorkspaceMemberProps {
  workspaceId: string;

  userId: string;

  role: WorkspaceRole;

  createdAt: Date;
}

export class WorkspaceMember extends Entity<WorkspaceMemberProps> {
  constructor(props: WorkspaceMemberProps, id: string) {
    super(props, id);
  }

  static create(params: {
    workspaceId: string;
    userId: string;
    role: WorkspaceRole;
  }): WorkspaceMember {
    return new WorkspaceMember(
      {
        workspaceId: params.workspaceId,

        userId: params.userId,

        role: params.role,

        createdAt: new Date(),
      },

      crypto.randomUUID(),
    );
  }
}
