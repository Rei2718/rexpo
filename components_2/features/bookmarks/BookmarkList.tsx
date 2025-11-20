import { ErrorComponent } from '@/components_2/core/ErrorComponent';
import { LoadingComponent } from '@/components_2/core/LoadingComponent';
import { ThemedText } from '@/components_2/core/ThemedText';
import { useBookmark } from '@/components_2/features/bookmarks/useBookmark';
import { EventCard } from '@/components_2/features/schedule/EventCard';
import { spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useGetEventsByIds } from '@/supabase/data';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type BookmarkListProps = {
    type: 'event' | 'food';
};

export function BookmarkList({ type }: BookmarkListProps) {
    const { bookmarkedIds } = useBookmark({ id: '', type });
    const { data, isLoading, isError } = useGetEventsByIds(bookmarkedIds);

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (isError) {
        return <ErrorComponent />;
    }

    const hasData = data && data.length > 0;

    if (!hasData) {
        return (
            <View style={styles.emptyContainer}>
                <ThemedText>ブックマークされたアイテムはありません。</ThemedText>
            </View>
        );
    }

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <EventCard
                    item={{
                        id: item.event_public_id || '',
                        title: item.title || '',
                        overview_description: item.overview_description || '',
                        logo_url: item.logo_url || '',
                    }}
                />
            )}
            keyExtractor={(item) => item.event_public_id || Math.random().toString()}
            ItemSeparatorComponent={ListSeparator}
            ListFooterComponent={<SafeAreaView edges={['bottom']} />}
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
