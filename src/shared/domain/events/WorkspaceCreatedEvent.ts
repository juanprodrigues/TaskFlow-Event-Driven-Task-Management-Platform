import { BaseDomainEvent } from "@/shared/domain/events/BaseDomainEvent";

export class WorkspaceCreatedEvent extends BaseDomainEvent {
  readonly eventName = "workspace.created";

  constructor(
    public readonly workspaceId: string,
    public readonly ownerId: string,
    public readonly workspaceName: string,
  ) {
    super();
  }
}