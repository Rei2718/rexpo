import { Colors, typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: keyof typeof typography;
  colorName?: keyof typeof Colors.light;
};

export function ThemedText({
  style,
  type = 'body',
  colorName = 'textPrimary',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(colorName);
  return (
    <Text
      style={[
        { color },
        typography[type],
        style,
      ]}
      {...rest}
    />
  );
}