import { container } from "tsyringe";

import { EventDispatcher } from "@/shared/domain/events/EventDispatcher";
import { InMemoryEventDispatcher } from "@/shared/infrastructure/events/InMemoryEventDispatcher";

container.registerSingleton<EventDispatcher>(
  "EventDispatcher",
  InMemoryEventDispatcher,
);