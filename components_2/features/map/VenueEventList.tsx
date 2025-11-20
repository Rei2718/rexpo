import { ErrorComponent } from '@/components_2/core/ErrorComponent';
import { LoadingComponent } from '@/components_2/core/LoadingComponent';
import { ThemedText } from '@/components_2/core/ThemedText';
import { EventCard } from '@/components_2/features/schedule/EventCard';
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

    if (isError) {
        return <ErrorComponent />;
    }

    const hasData = data && data.length > 0;

    if (!hasData) {
        return (
            <View style={styles.emptyContainer}>
                <ThemedText>この会場に関連するイベントはありません。</ThemedText>
            </View>
        );
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
    return (
        <View
            style={[
                styles.separator,
                { borderBottomColor: separatorColor },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    separator: {
        height: spacing.s,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: spacing.s,
    },
    flatListContent: {
        padding: spacing.xl,
    },
});
