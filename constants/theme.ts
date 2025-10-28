import { Platform } from 'react-native';

// 1. Define accent colors for interactive elements
const accentColorLight = '#0091FF'; // System Blue (Light)
const accentColorDark = '#0088FF';  // System Blue (Dark)

export const Colors = {
  light: {
    // --- Text Colors ---
    // For primary text like titles and body.
    textPrimary: '#000000',
    // For secondary text like captions and subtitles.
    textSecondary: '#636366',
    // For tertiary text like disabled text.
    textTertiary: '#8D8D93',
    // For interactive text like links.
    textAccent: accentColorLight,

    // --- Background Colors ---
    // For the main background of a screen.
    backgroundPrimary: '#FFFFFF',
    // For grouped content or cards.
    backgroundSecondary: '#F2F2F7',
    // For content on top of secondary backgrounds.
    backgroundTertiary: '#FFFFFF',

    // --- Component Colors ---
    // For interactive elements like buttons.
    accent: accentColorLight,
    // For separators and dividers.
    separator: '#C6C6C8',
    // For icons.
    icon: '#636366',
    // For default tab bar icons.
    tabIconDefault: '#8D8D93',
    // For selected tab bar icons.
    tabIconSelected: accentColorLight,

    // --- System Colors ---
    // For destructive actions like delete buttons.
    destructive: '#FF3B30',
    // For indicating success.
    success: '#34C759',
    // For indicating warnings.
    warning: '#FF9500',
  },
  dark: {
    // --- Text Colors ---
    // For primary text like titles and body.
    textPrimary: '#FBFBFC',
    // For secondary text like captions and subtitles (60% opacity).
    textSecondary: '#AEAEB2',
    // For tertiary text like disabled text (30% opacity).
    textTertiary: '#8E8E93',
    // For interactive text like links.
    textAccent: accentColorDark,

    // --- Background Colors ---
    // For the main background of a screen.
    backgroundPrimary: '#000000',
    // For grouped content or cards.
    backgroundSecondary: '#232328',
    // For content on top of secondary backgrounds.
    backgroundTertiary: '#3A3A3C',

    // --- Component Colors ---
    // For interactive elements like buttons.
    accent: accentColorDark,
    // For separators and dividers.
    separator: '#38383A',
    // For icons.
    icon: '#EBEBF599',
    // For default tab bar icons.
    tabIconDefault: '#EBEBF54D',
    // For selected tab bar icons.
    tabIconSelected: accentColorDark,

    // --- System Colors ---
    // For destructive actions like delete buttons.
    destructive: '#FF453A',
    // For indicating success.
    success: '#30D158',
    // For indicating warnings.
    warning: '#FF9F0A',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
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
