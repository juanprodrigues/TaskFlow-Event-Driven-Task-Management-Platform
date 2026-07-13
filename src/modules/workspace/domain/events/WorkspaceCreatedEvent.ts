import { DomainEvent } from "@/shared/domain/events/DomainEvent";

export class WorkspaceCreatedEvent
implements DomainEvent {

    eventName = "workspace.created";

    occurredOn = new Date();

    constructor(

        public readonly workspaceId: string,

        public readonly ownerId: string,

        public readonly workspaceName: string,

    ){}
}