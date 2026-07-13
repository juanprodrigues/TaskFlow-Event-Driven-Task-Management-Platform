import { DomainEvent } from "@/shared/domain/events/DomainEvent";

export class WorkspaceMemberAddedEvent implements DomainEvent {
  eventName = "workspace.member.added";

  readonly occurredOn = new Date();

  constructor(
    public readonly workspaceId: string,
    public readonly memberId: string,
    public readonly invitedBy: string,
  ) {}
}
