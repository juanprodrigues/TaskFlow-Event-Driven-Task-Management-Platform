import { randomUUID } from "node:crypto";

import { DomainEvent } from "./DomainEvent";

export abstract class BaseDomainEvent implements DomainEvent {
  public readonly eventId: string;

  public readonly occurredOn: Date;

  abstract readonly eventName: string;

  protected constructor() {
    this.eventId = randomUUID();
    this.occurredOn = new Date();
  }
}