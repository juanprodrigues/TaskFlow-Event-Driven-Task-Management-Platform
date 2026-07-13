import { DomainEvent } from "@/shared/domain/events/DomainEvent";

export class ProjectCreatedEvent implements DomainEvent {
  readonly occurredOn = new Date();
  readonly eventName="project.created.event";

  constructor(
    public readonly projectId: string,
    public readonly workspaceId: string,
  ) {}
}