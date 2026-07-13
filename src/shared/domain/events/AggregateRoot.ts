import { Entity } from "../entities/Entity";
import { DomainEvent } from "./DomainEvent";

export abstract class AggregateRoot<T> extends Entity<T> {
  private readonly domainEvents: DomainEvent[] = [];

  protected constructor(props: T, id: string) {
    super(props, id);
  }

  protected addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): DomainEvent[] {
    const events = [...this.domainEvents];

    this.domainEvents.length = 0;

    return events;
  }
}
