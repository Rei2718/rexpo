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

    if (isPending) {
        return (
            <View style={styles.centerContainer}>
                <ThemedText>Loading...</ThemedText>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.centerContainer}>
                <ThemedText>Error loading venues</ThemedText>
            </View>
        );
    }

    return (
        <View>
            <FlatList
                data={venues}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <VenueListItem
                        item={item}
                        isSelected={item.id === selectedVenueId}
                        onSelect={onVenueSelect}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={Separator}
            />
        </View>
    );
}

function VenueListItem({ item, isSelected, onSelect }: { item: GetVenues; isSelected: boolean; onSelect: (venue: GetVenues) => void }) {
    const activeBackgroundColor = useThemeColor("accent");
    const inactiveBackgroundColor = useThemeColor("backgroundTertiary");
    const activeTextColor = useThemeColor("backgroundPrimary");
    const inactiveTextColor = useThemeColor("textPrimary");

    return (
        <Pressable onPress={() => onSelect(item)}>
            <ThemedView
                style={[
                    styles.item,
                    { backgroundColor: isSelected ? activeBackgroundColor : inactiveBackgroundColor }
                ]}
            >
                <ThemedText
                    type="label"
                    style={{ color: isSelected ? activeTextColor : inactiveTextColor }}
                >
                    {item.name}
                </ThemedText>
            </ThemedView>
        </Pressable>
    );
}

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
    centerContainer: {
        padding: spacing.m,
        alignItems: 'center',
        justifyContent: 'center',
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
