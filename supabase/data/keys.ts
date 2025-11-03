import { Tag } from "./types";

export const keys = {
  all: ['event_list'] as const,
  getOverviewList: (tag: Tag) => [...keys.all, tag] as const,
} as const