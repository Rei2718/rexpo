import { LoadingComponent } from '@/components_2/core/LoadingComponent';
import { EventCard } from '@/components_2/features/exploration/EventCard';
import { spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useGetEventsByVenue } from '@/supabase/data';
import { FlatList, StyleSheet, View } from 'react-native';

interface VenueEventListProps {
    venueId: string;
}

export function VenueEventList({ venueId }: VenueEventListProps) {
    const { data, isPending, isError } = useGetEventsByVenue(venueId);

    if (isPending) {
        return <LoadingComponent />;
    }


    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <EventCard item={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ListSeparator}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
        />
    );
}

const ListSeparator = () => {
    const separatorColor = useThemeColor("backgroundTertiary");
    return <View style={[styles.separator, { borderBottomColor: separatorColor }]} />;
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    separator: {
        height: spacing.s,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: spacing.s,
    },
    flatListContent: {
        paddingHorizontal: spacing.xl,
    },
});
