import { randomUUID } from "node:crypto";

import { AggregateRoot } from "@/shared/domain/events/AggregateRoot";
import { WorkspaceCreatedEvent } from "@/shared/domain/events/WorkspaceCreatedEvent";
import { WorkspaceName } from "../value-objects/WorkspaceName";

export class Workspace extends AggregateRoot {
  private constructor(
    public readonly id: string,
    public name: WorkspaceName,
    public description: string | null,
    public readonly ownerId: string,
    public readonly createdAt: Date,
  ) {
    super();
  }

  static create(params: {
    name: string;
    description?: string | null;
    ownerId: string;
  }): Workspace {
    const workspace = new Workspace(
      randomUUID(),
      WorkspaceName.create(params.name),
      params.description ?? null,
      params.ownerId,
      new Date(),
    );

    workspace.addDomainEvent(
      new WorkspaceCreatedEvent(
        workspace.id,
        workspace.ownerId,
        WorkspaceName.name,
      ),
    );

    return workspace;
  }
}