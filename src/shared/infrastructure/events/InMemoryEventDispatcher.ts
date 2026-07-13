import { injectable } from "tsyringe";

import { DomainEvent } from "@/shared/domain/events/DomainEvent";
import { EventDispatcher } from "@/shared/domain/events/EventDispatcher";
import { EventHandler } from "@/shared/domain/events/EventHandler";

@injectable()
export class InMemoryEventDispatcher implements EventDispatcher {
  private readonly handlers = new Map<
    string,
    EventHandler<DomainEvent>[]
  >();

  register<T extends DomainEvent>(
    eventName: string,
    handler: EventHandler<T>,
  ): void {
    const eventHandlers =
      this.handlers.get(eventName) ?? [];

    eventHandlers.push(handler as EventHandler<DomainEvent>);

    this.handlers.set(eventName, eventHandlers);
  }

  async dispatch(event: DomainEvent): Promise<void> {
    const handlers =
      this.handlers.get(event.eventName) ?? [];

    await Promise.all(
      handlers.map(handler => handler.handle(event)),
    );
  }

  async dispatchAll(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.dispatch(event);
    }
  }
}