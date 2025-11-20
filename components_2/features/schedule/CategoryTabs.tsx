import { ThemedText } from '@/components_2/core/ThemedText';
import { ThemedView } from '@/components_2/core/ThemedView';
import { CATEGORY_NAMES } from '@/constants/category-map';
import { radii, spacing } from '@/constants/theme';
import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export function CategoryTabs() {
    return (
        <ThemedView>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={styles.scrollContainer}
            >
                {CATEGORY_NAMES.map((categoryName) => (
                    <Link
                        key={categoryName}
                        href={{
                            pathname: '/category-modal',
                            params: { categoryName: categoryName },
                        }}
                        asChild
                    >
                        <Pressable>
                            <ThemedView
                                colorName="backgroundTertiary"
                                style={styles.tabContainer}
                            >
                                <ThemedText type="label">{categoryName}</ThemedText>
                            </ThemedView>
                        </Pressable>
                    </Link>
                ))}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: spacing.xl,
        gap: spacing.s,
    },
    tabContainer: {
        paddingHorizontal: spacing.l,
        paddingVertical: spacing.s,
        borderRadius: radii.pill,
    },
});
