import { TagInfo } from './category-map';

export type ExplorationPresetSection = {
    id: string;
    type: 'tag-list';
} & TagInfo;

export type ExplorationPreset = {
    id: string;
    label: string;
    sections: ExplorationPresetSection[];
};

// 1. 総合ガイド: バランスよく全てのジャンルを楽しみたい人向け
export const DEFAULT_PRESET: ExplorationPreset = {
    id: 'default',
    label: '探索',
    sections: [
        {
            id: 'home-tech',
            type: 'tag-list',
            tag: 'テクノロジー_TEST',
            title: '注目のテクノロジー',
            subtitle: 'AI・ロボティクス・未来の技術',
        },
        {
            id: 'home-creative',
            type: 'tag-list',
            tag: 'クリエイティブ_TEST',
            title: 'クリエイティブ展示',
            subtitle: 'デザイン・アート・映像作品',
        },
        {
            id: 'home-community',
            type: 'tag-list',
            tag: 'コミュニティ_TEST',
            title: 'みんなで楽しむ',
            subtitle: 'フード・ゲーム・交流イベント',
        },
    ],
};

// 2. アカデミック＆ビジネス: 真面目に学びたい、企業と繋がりたい人向け
export const ACADEMIC_PRESET: ExplorationPreset = {
    id: 'academic',
    label: '学びとビジネス',
    sections: [
        {
            id: 'biz-main',
            type: 'tag-list',
            tag: 'ビジネス_TEST',
            title: 'ビジネス・起業',
            subtitle: 'ピッチコンテスト・キャリア講演',
        },
        {
            id: 'tech-research',
            type: 'tag-list',
            tag: 'テクノロジー_TEST',
            title: '研究発表・技術展示',
            subtitle: '学生研究・プログラミング成果',
        },
    ],
};

// 3. フェスティバル: とにかく盛り上がりたい、雰囲気を楽しみたい人向け
export const FESTIVAL_PRESET: ExplorationPreset = {
    id: 'festival',
    label: 'お祭り・交流',
    sections: [
        {
            id: 'fest-stage',
            type: 'tag-list',
            tag: 'クリエイティブ_TEST',
            title: 'ステージ＆パフォーマンス',
            subtitle: 'バンド・ダンス・ライブペイント',
        },
        {
            id: 'fest-food',
            type: 'tag-list',
            tag: 'コミュニティ_TEST',
            title: 'フード＆リラックス',
            subtitle: 'キッチンカー・DJイベント・休憩',
        },
    ],
};

export const EXPLORATION_PRESETS: ExplorationPreset[] = [
    DEFAULT_PRESET,
    ACADEMIC_PRESET,
    FESTIVAL_PRESET,
];