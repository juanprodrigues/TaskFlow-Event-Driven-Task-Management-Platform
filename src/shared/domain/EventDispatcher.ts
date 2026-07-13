import { DomainEvent } from "./DomainEvent";
import { EventHandler } from "./EventHandler";

export interface EventDispatcher {
  register<T extends DomainEvent>(
    eventName: string,
    handler: EventHandler<T>,
  ): void;

  dispatch(event: DomainEvent): Promise<void>;

  dispatchAll(events: DomainEvent[]): Promise<void>;
}