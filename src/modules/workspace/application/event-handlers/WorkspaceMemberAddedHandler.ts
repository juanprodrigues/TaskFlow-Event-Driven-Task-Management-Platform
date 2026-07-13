import { injectable } from "tsyringe";

import { WorkspaceMemberAddedEvent } from "../../domain/events/WorkspaceMemberAddedEvent";

@injectable()
export class WorkspaceMemberAddedHandler {
  async handle(event: WorkspaceMemberAddedEvent): Promise<void> {
    console.log(
      `[EVENT] Member ${event.memberId} added to workspace ${event.workspaceId}`,
    );
  }
}
