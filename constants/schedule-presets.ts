import { TagInfo } from './category-map';

export type SchedulePresetSection = {
    id: string;
    type: 'tag-list';
} & TagInfo;

export type SchedulePreset = {
    id: string;
    label: string;
    sections: SchedulePresetSection[];
};

export const DEFAULT_PRESET: SchedulePreset = {
    id: 'default',
    label: 'イベント',
    sections: [
        {
            id: 'main-1',
            type: 'tag-list',
            tag: 'MainEvent_TEST',
            title: 'テストタグ-ファースト',
            subtitle: 'これはテストのタイトルにぴったり',
        },
        {
            id: 'sub-1',
            type: 'tag-list',
            tag: 'SubEvent_TEST',
            title: 'テストタグ-セカンド',
            subtitle: 'これはテストのタイトルにぴったり',
        },
    ],
};

export const EXPLORE_PRESET: SchedulePreset = {
    id: 'explore',
    label: '探索',
    sections: [
        {
            id: 'explore-1',
            type: 'tag-list',
            tag: 'SubEvent_TEST',
            title: '人気のイベント',
            subtitle: '今注目されているイベント',
        },
        {
            id: 'explore-2',
            type: 'tag-list',
            tag: 'MainEvent_TEST',
            title: 'おすすめ',
            subtitle: 'あなたにぴったりのイベント',
        },
    ],
};

export const SCHEDULE_PRESETS: SchedulePreset[] = [
    DEFAULT_PRESET,
    EXPLORE_PRESET,
];
