import { spacing } from '@/constants/theme';
import { useChunkedData } from '@/hooks/use-chunked-data';
import { useGetEventsListByTag } from '@/supabase/data';
import { FlatList, StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';
import { ErrorComponent } from '../ui/error-component';
import { LoadingComponent } from '../ui/loading-component';
import { EventColumn } from './event-column';

const CHUNK_SIZE = 3;

type EventTagListProps = {
  targetTag: string;
  title: string;
  subtitle: string;
};

export function EventTagList({ targetTag, title, subtitle }: EventTagListProps) {
  const { data: originalData, isPending, isError } = useGetEventsListByTag(targetTag);
  const chunkedData = useChunkedData(originalData, CHUNK_SIZE);

  const renderContent = () => {
    if (isPending) {
      return <LoadingComponent />;
    }

    if (isError) {
      return <ErrorComponent />;
    }

    if (!chunkedData || chunkedData.length === 0) {
      return (
        <ThemedText style={styles.emptyText}>
          関連するイベントはありません。
        </ThemedText>
      );
    }

    return (
      <FlatList
        data={chunkedData}
        renderItem={({ item }) => <EventColumn items={item} />}
        keyExtractor={(chunk) => chunk[0].id}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.flatListContent}
      />
    );
  };

  return (
    <View>
      <ThemedText type="body" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText type="body" colorName="textSecondary" style={styles.subtitle}>
        {subtitle}
      </ThemedText>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingTop: spacing.xxl,
    paddingLeft: spacing.xl,
    textAlign: 'left',
  },
  subtitle: {
    paddingBottom: spacing.xl,
    paddingLeft: spacing.xl,
  },
  emptyText: {
    paddingHorizontal: spacing.xl,
  },
  separator: {
    width: spacing.l,
  },
  flatListContent: {
    paddingHorizontal: spacing.xl,
  },
});