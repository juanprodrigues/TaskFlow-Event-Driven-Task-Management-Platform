import { DomainEvent } from "./DomainEvent";

export abstract class AggregateRoot {
  private readonly domainEvents: DomainEvent[] = [];

  protected addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): DomainEvent[] {
    const events = [...this.domainEvents];

    this.clearDomainEvents();

    return events;
  }

  public clearDomainEvents(): void {
    this.domainEvents.length = 0;
  }

  public getDomainEvents(): readonly DomainEvent[] {
    return [...this.domainEvents];
  }
}