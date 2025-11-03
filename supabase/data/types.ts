import { Database } from "../database.types";
export type Tag = string;
export type EventOverview = Database['public']['Functions']['get_events_by_tag']['Returns'][number];