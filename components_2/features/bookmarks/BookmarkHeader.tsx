import { ThemedText } from '@/components_2/core/ThemedText';
import { spacing, typography } from '@/constants/theme';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

export function BookmarkHeader() {
    const { height } = useWindowDimensions();
    const gradientHeight = height * 0.2;

    return (
        <View
            style={[
                styles.container,
                {
                    height: gradientHeight,
                    marginTop: -gradientHeight,
                }
            ]}
        >
            <ThemedText style={typography.h1} colorName="textPrimary">
                Bookmarks
            </ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        padding: spacing.xl,
    },
});
