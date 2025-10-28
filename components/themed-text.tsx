import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | "label" | 'title' | "ExtraLargeTitle" | 'defaultSemiBold' | 'subtitle' | 'link';
  colorName?: keyof typeof Colors.light;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  colorName = 'textPrimary',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, colorName)

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'label' ? styles.label : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'ExtraLargeTitle' ? styles.ExtraLargeTitle : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 23,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '800',
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 28,
  },
  ExtraLargeTitle: {
    fontSize: 35,
    fontWeight: "700",
    lineHeight: 43,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 25,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
  },
});
