import { SchedulePreset } from '@/constants/schedule-presets';
import { GetEventsListByTag } from '@/supabase/data/types';

export interface EventCardProps {
    item: GetEventsListByTag;
}

export interface EventColumnProps {
    items: GetEventsListByTag[];
}

export interface EventTagListProps {
    targetTag: string;
    title: string;
    subtitle: string;
}

export interface EventTagListUIProps {
    title: string;
    subtitle: string;
    chunkedData: GetEventsListByTag[][];
}

export interface PresetDropdownProps {
    presets: SchedulePreset[];
    activePresetId: string;
    onSelectPreset: (presetId: string) => void;
}
