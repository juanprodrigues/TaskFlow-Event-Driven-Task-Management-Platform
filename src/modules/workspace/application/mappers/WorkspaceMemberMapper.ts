import { WorkspaceMember } from "../../domain/entities/WorkspaceMember";
import { WorkspaceRole as PrismaWorkspaceRole } from "@prisma/client";

import {
  WorkspaceRole,
  WorkspaceRoleType,
} from "../../domain/value-objects/WorkspaceRole";

export class WorkspaceMemberMapper {
  static toDomain(raw: {
    id: string;
    workspaceId: string;
    userId: string;
    role: PrismaWorkspaceRole;
    createdAt: Date;
    updatedAt: Date;
  }): WorkspaceMember {
        return WorkspaceMember.restore({
        id: raw.id,
        workspaceId: raw.workspaceId,
        userId: raw.userId,
        role: WorkspaceRole.create(raw.role as WorkspaceRoleType),
        createdAt: raw.createdAt,
        });
  }

  static toPersistence(member: WorkspaceMember) {
    const props = member.getProps();

    return {
      id: member.getId(),

      workspaceId: props.workspaceId,

      userId: props.userId,

      role: props.role.getValue(),

      createdAt: props.createdAt,
    };
  }
}
