import { GetEventsListByTag } from '@/supabase/data/types';

export type EventTagListProps = {
    targetTag: string;
    title: string;
    subtitle: string;
};

export type EventTagListUIProps = {
    title: string;
    subtitle: string;
    chunkedData: GetEventsListByTag[][];
};

export type EventColumnProps = {
    items: GetEventsListByTag[];
    width: number;
};

export type EventCardProps = {
    item: GetEventsListByTag;
};
