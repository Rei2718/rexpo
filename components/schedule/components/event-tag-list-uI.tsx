import { ThemedText } from '@/components/themed-text';
import { spacing } from '@/constants/theme';
import { EventOverview } from '@/supabase/data/types';
import { FlatList, StyleSheet, View } from 'react-native';
import { EventColumn } from './event-column';

type EventTagListUIProps = {
  title: string;
  subtitle: string;
  chunkedData: EventOverview[][];
};

export function EventTagListUI({ title, subtitle, chunkedData }: EventTagListUIProps) {
  const hasData = chunkedData && chunkedData.length > 0;

  return (
    <View>
      <View style={styles.headerContainer}>
        <ThemedText type="h2">{title}</ThemedText>
        <ThemedText type="caption" colorName="textSecondary">{subtitle}</ThemedText>
      </View>
      {hasData ? (
        <FlatList
          data={chunkedData}
          renderItem={({ item }) => <EventColumn items={item} />}
          keyExtractor={(chunk) => chunk[0].event_id}
          horizontal={true}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
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