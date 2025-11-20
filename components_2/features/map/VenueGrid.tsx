import { ThemedText } from '@/components_2/core/ThemedText';
import { ThemedView } from '@/components_2/core/ThemedView';
import { Colors, radii, spacing } from '@/constants/theme';
import { useGetVenues } from '@/supabase/data';
import { GetVenues } from '@/supabase/data/types';
import { FlatList, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

interface VenueGridProps {
    onVenueSelect: (venueId: string) => void;
    selectedVenueId?: string;
}

export function VenueGrid({ onVenueSelect, selectedVenueId }: VenueGridProps) {
    const { data: venues } = useGetVenues();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const renderItem = ({ item }: { item: GetVenues }) => {
        const isSelected = item.id === selectedVenueId;
        return (
            <TouchableOpacity
                style={[
                    styles.card,
                    {
                        backgroundColor: theme.backgroundPrimary,
                        borderColor: isSelected ? theme.accent : theme.separator,
                        borderWidth: isSelected ? 2 : 1,
                    }
                ]}
                onPress={() => onVenueSelect(item.id)}
            >
                <ThemedText type="label" style={styles.venueName}>
                    {item.name}
                </ThemedText>
                <ThemedText type="caption" style={{ color: theme.textSecondary }}>
                    ID: {item.id.slice(0, 8)}...
                </ThemedText>
            </TouchableOpacity>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={venues}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.columnWrapper}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        padding: spacing.m,
        paddingBottom: 100, // Add padding for bottom sheet
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        padding: spacing.m,
        borderRadius: radii.m,
        marginBottom: spacing.m,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    venueName: {
        textAlign: 'center',
        marginBottom: spacing.xs,
    },
});
