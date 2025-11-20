import { ThemedText } from '@/components_2/core/ThemedText';
import { ThemedView } from '@/components_2/core/ThemedView';
import { radii, spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useGetVenues } from '@/supabase/data';
import { GetVenues } from '@/supabase/data/types';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

interface VenueListProps {
    onVenueSelect: (venue: GetVenues) => void;
    selectedVenueId?: string;
}

export function VenueList({ onVenueSelect, selectedVenueId }: VenueListProps) {
    const { data: venues, isPending, isError } = useGetVenues();
    const activeBackgroundColor = useThemeColor("accent");
    const inactiveBackgroundColor = useThemeColor("backgroundTertiary");
    const activeTextColor = useThemeColor("backgroundPrimary");

    if (isPending) {
        return (
            <View style={styles.loadingContainer}>
                <ThemedText>Loading...</ThemedText>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.loadingContainer}>
                <ThemedText>Error loading venues</ThemedText>
            </View>
        );
    }

    return (
        <View>
            <FlatList
                data={venues}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const isSelected = item.id === selectedVenueId;
                    return (
                        <Pressable onPress={() => onVenueSelect(item)}>
                            <ThemedView
                                style={[
                                    styles.item,
                                    { backgroundColor: isSelected ? activeBackgroundColor : inactiveBackgroundColor }
                                ]}
                            >
                                <ThemedText
                                    type="label"
                                    style={isSelected ? { color: activeTextColor } : undefined}
                                >
                                    {item.name}
                                </ThemedText>
                            </ThemedView>
                        </Pressable>
                    );
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        padding: spacing.m,
    },
    item: {
        paddingHorizontal: spacing.l,
        paddingVertical: spacing.s,
        borderRadius: radii.pill,
    },
    listContent: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.m,
    },
    separator: {
        width: spacing.s,
    },
});
