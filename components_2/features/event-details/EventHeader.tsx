import { ThemedText } from '@/components_2/core/ThemedText';
import { spacing } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';
import { EventHeaderProps } from './types';

export function EventHeader({
    title,
    overview_description,
    sponsorTier,
}: EventHeaderProps) {
    return (
        <View style={styles.headerContainer}>
            <ThemedText type="caption" colorName="textAccent" style={styles.sponcorText}>
                プラチナブーススポンサー
            </ThemedText>
            <ThemedText type="h1">{title}</ThemedText>
            <ThemedText type="h3" colorName="textSecondary">
                {overview_description}
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.l,
        alignItems: 'center',
    },
    sponcorText: {
        marginTop: spacing.xxs,
    },
});
