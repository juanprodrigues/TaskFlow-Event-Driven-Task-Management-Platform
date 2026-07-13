import { DomainEvent } from "./DomainEvent";

export interface EventHandler<T extends DomainEvent = DomainEvent> {
  handle(event: T): Promise<void>;
}