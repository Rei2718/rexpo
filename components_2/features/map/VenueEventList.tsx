import { LoadingComponent } from '@/components_2/core/LoadingComponent';
import { EventCard } from '@/components_2/features/exploration/EventCard';
import { spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useGetEventsByVenue } from '@/supabase/data';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface VenueEventListProps {
    venueId: string;
    ListHeaderComponent?: React.ReactElement | null;
}

export function VenueEventList({ venueId, ListHeaderComponent }: VenueEventListProps) {
    const { data, isPending, isError } = useGetEventsByVenue(venueId);

    if (isPending) {
        return <LoadingComponent />;
    }


    return (
        <BottomSheetFlatList
            data={data}
            renderItem={({ item }: { item: any }) => <EventCard item={item} />}
            keyExtractor={(item: any) => item.id}
            ItemSeparatorComponent={ListSeparator}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeaderComponent}
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
        paddingBottom: spacing.xl,
    },
});
