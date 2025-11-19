import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
    colorName?: keyof typeof Colors.light;
};

export function ThemedView({
    style,
    colorName = 'backgroundPrimary',
    ...otherProps
}: ThemedViewProps) {
    const backgroundColor = useThemeColor(colorName);
    return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
