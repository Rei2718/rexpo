import { Tag } from "./types";

export const keys = {
  all: ['event_list_by_tag'] as const,
  getEventsListByTag: (tag: Tag) => [...keys.all, tag] as const,
} as const