import { ThemedText } from '@/components_2/core/ThemedText';
import { ThemedView } from '@/components_2/core/ThemedView';
import { spacing } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';

export function FoodExploration() {
    return (
        <ThemedView style={styles.container}>
            <View style={styles.content}>
                <ThemedText>Food Exploration Coming Soon</ThemedText>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.l,
    },
});