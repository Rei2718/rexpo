import { ThemedText } from '@/components/themed-text';
import { spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { GetEventsListByTag } from '@/supabase/data/types';
import { FlatList, StyleSheet, View } from 'react-native';
import { EventCard } from '../schedule/event-card';

type EventTagListProps = {
  data: GetEventsListByTag[];
  tagName: string;
};

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

export function EventTagList({ data, tagName }: EventTagListProps) {
  const hasData = data && data.length > 0;

  if (!hasData) {
    return (
      <View style={styles.emptyContainer}>
        <ThemedText>「{tagName}」に関連するイベントはありません。</ThemedText>
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