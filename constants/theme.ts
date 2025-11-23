import { Platform } from 'react-native';

const accentColorLight = '#6155F5';
const accentColorDark = '#6B5DFF';

export const Colors = {
  light: {
    textPrimary: '#000000',
    textSecondary: '#636366',
    textTertiary: '#8D8D93',
    textAccent: accentColorLight,

    backgroundPrimary: '#FFFFFF',
    backgroundSecondary: '#F2F2F7',
    backgroundTertiary: '#FFFFFF',

    accent: accentColorLight,
    separator: '#C6C6C8',
    icon: '#636366',
    tabIconDefault: '#8D8D93',
    tabIconSelected: accentColorLight,

    destructive: '#FF383C',
    success: '#34C759',
    warning: '#FF9500',
    overlay: '#0D0D1280',
  },
  dark: {
    textPrimary: '#F2E3FF',
    textSecondary: '#8C8C8C',
    textTertiary: '#363638',
    textAccent: accentColorDark,

    backgroundPrimary: '#161616',
    backgroundSecondary: '#292929',
    backgroundTertiary: '#383838',

    accent: accentColorDark,
    separator: '#38383A',
    icon: '#EBEBF599',
    tabIconDefault: '#EBEBF54D',
    tabIconSelected: accentColorDark,

    destructive: '#FF453A',
    success: '#30D158',
    warning: '#FF9F0A',
    overlay: '#0D0D1280',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const spacing = {
  xxs: 2,
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 48,
  xxxl: 60,
  xxxxl: 96,
} as const;


export const radii = {
  xs: 2,
  s: 4,
  m: 8,
  l: 16,
  xl: 24,
  pill: 9999,
} as const;

export const typography = {
  h1: {
    fontSize: 32,
    lineHeight: 42,
    fontWeight: "600",
  },
  h2: {
    fontSize: 21,
    fontWeight: "500",
    lineHeight: 31,
  },
  h3: {
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 27,
  },
  body: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 26,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 26,
  },
  caption: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
  },
  link: {
    fontSize: 16,
    lineHeight: 26,
  },
} as const;
