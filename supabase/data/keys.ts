import { Tag } from "./types";

export const keys = {
  all: ['event_list_by_tag'] as const,
  getEventsListByTag: (tag: Tag) => [...keys.all, tag] as const,

  details: ['event_details'] as const,
  getEventDetailsById: (id: string) => [...keys.details, id] as const,
} as const