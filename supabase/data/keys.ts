import { EventCategory, EventId } from "./types";

export const keys = {
  all: ['event_list'] as const,
  getViewEventList: (category: EventCategory) => [...keys.all, category] as const,
  getViewEventDetails: (id: EventId) => [...keys.all, id] as const,
} as const;