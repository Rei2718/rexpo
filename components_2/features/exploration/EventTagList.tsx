import { ErrorComponent } from '@/components_2/core/ErrorComponent';
import { LoadingComponent } from '@/components_2/core/LoadingComponent';
import { ThemedText } from '@/components_2/core/ThemedText';
import { spacing } from '@/constants/theme';
import { useChunkedData } from '@/hooks/use-chunked-data';
import { useGetEventsListByTag } from '@/supabase/data';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { EventColumn } from './EventColumn';
import { EventTagListProps } from './types';

const CHUNK_SIZE = 3;

export function EventTagList({ targetTag, title, subtitle }: EventTagListProps) {
    const { data: originalData, isPending, isError } = useGetEventsListByTag(targetTag);
    const chunkedData = useChunkedData(originalData, CHUNK_SIZE);
    const { width } = useWindowDimensions();

    if (isPending) {
        return <LoadingComponent />;
    }

    if (isError) {
        return <ErrorComponent />;
    }

    const hasData = chunkedData && chunkedData.length > 0;
    const itemWidth = width * 0.85;
    const separatorWidth = spacing.xl;
    const snapInterval = itemWidth + separatorWidth;

    return (
        <View>
            <View style={styles.headerContainer}>
                <ThemedText type="h2">{title}</ThemedText>
                <ThemedText type="caption" colorName="textSecondary">{subtitle}</ThemedText>
            </View>
            {hasData ? (
                <FlatList
                    data={chunkedData}
                    renderItem={({ item }) => <EventColumn items={item} width={itemWidth} />}
                    keyExtractor={(chunk) => chunk[0].id}
                    horizontal={true}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                    snapToInterval={snapInterval}
                    snapToAlignment="center"
                    decelerationRate="normal"
                    disableIntervalMomentum={true}
                    nestedScrollEnabled={true}
                />
            ) : (
                <ThemedText style={styles.emptyText}>関連するイベントはありません。</ThemedText>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingBottom: spacing.m,
        paddingHorizontal: spacing.xl,
        gap: spacing.xs,
    },
    emptyText: {
        paddingHorizontal: spacing.xl,
    },
    separator: {
        width: spacing.xl,
    },
    flatListContent: {
        paddingHorizontal: spacing.xl,
    },
});
