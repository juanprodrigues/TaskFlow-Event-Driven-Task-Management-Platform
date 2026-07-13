import { WorkspaceRole } from "../value-objects/WorkspaceRole";
import { AggregateRoot } from "@/shared/domain/events/AggregateRoot";
import { WorkspaceMemberAddedEvent } from "../events/WorkspaceMemberAddedEvent";
import { randomUUID } from "node:crypto";
export interface WorkspaceMemberProps {
  workspaceId: string;

  userId: string;

  role: WorkspaceRole;

  createdAt: Date;
}

export class WorkspaceMember extends AggregateRoot<WorkspaceMemberProps> {
  constructor(props: WorkspaceMemberProps, id: string) {
    super(props, id);
  }

  static create(params: {
    workspaceId: string;
    userId: string;
    role: WorkspaceRole;
  }): WorkspaceMember {
    const member = new WorkspaceMember(
      {
        workspaceId: params.workspaceId,
        userId: params.userId,
        role: params.role,
        createdAt: new Date(),
      },
      randomUUID(),
    );

    member.addDomainEvent(
      new WorkspaceMemberAddedEvent(
        member.getProps().workspaceId,
        member.getId(),
        member.getProps().userId,
      ),
    );

    return member;
  }

  static restore(data: {
    id: string;
    workspaceId: string;
    userId: string;
    role: WorkspaceRole;
    createdAt: Date;
  }): WorkspaceMember {
    return new WorkspaceMember(
      {
        workspaceId: data.workspaceId,
        userId: data.userId,
        role: data.role,
        createdAt: data.createdAt,
      },
      data.id,
    );
  }
}
