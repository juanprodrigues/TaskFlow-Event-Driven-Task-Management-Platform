import { randomUUID } from "node:crypto";

import { AggregateRoot } from "@/shared/domain/events/AggregateRoot";

import { WorkspaceCreatedEvent } from "../events/WorkspaceCreatedEvent";

import { WorkspaceName } from "../value-objects/WorkspaceName";

export interface WorkspaceProps {
  name: WorkspaceName;
  description: string | null;
  ownerId: string;
  createdAt: Date;
}

export class Workspace extends AggregateRoot<WorkspaceProps> {
  private constructor(props: WorkspaceProps, id: string) {
    super(props, id);
  }

  static create(params: {
    name: string;
    description?: string | null;
    ownerId: string;
  }): Workspace {
    const workspace = new Workspace(
      {
        name: WorkspaceName.create(params.name),
        description: params.description ?? null,
        ownerId: params.ownerId,
        createdAt: new Date(),
      },
      randomUUID(),
    );

    workspace.addDomainEvent(
      new WorkspaceCreatedEvent(
        workspace.getId(),
        workspace.props.ownerId,
        workspace.props.name.getValue(),
      ),
    );

    return workspace;
  }

  static restore(data: {
    id: string;
    name: string;
    description: string | null;
    ownerId: string;
    createdAt: Date;
  }): Workspace {
    return new Workspace(
      {
        name: WorkspaceName.create(data.name),
        description: data.description,
        ownerId: data.ownerId,
        createdAt: data.createdAt,
      },
      data.id,
    );
  }
}
