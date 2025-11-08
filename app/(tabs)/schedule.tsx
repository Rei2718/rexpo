import CarouselContents from '@/components/schedule/carousel-contents';
import { CategoryTabs } from '@/components/schedule/category-tabs';
import { EventTagListContainer } from '@/components/schedule/event-tag-list-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { spacing } from '@/constants/theme';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScheduleHeader = () => (
  <View>
    <ThemedText type="h1" style={styles.title}>
      イベント
    </ThemedText>
    <View style={styles.tabs}>
      <CategoryTabs />
    </View>
    <View>
      <CarouselContents />
    </View>
  </View>
);

const sections = [
  { key: 'header', render: () => <ScheduleHeader /> },
  {
    key: 'main-1',
    render: () => (
      <EventTagListContainer
        targetTag="MainEvent_TEST"
        title="テストタグ-ファースト"
        subtitle="これはテストのタイトルにぴったり"
      />
    ),
  },
  {
    key: 'sub-1',
    render: () => (
      <EventTagListContainer
        targetTag="SubEvent_TEST"
        title="テストタグ-セカンド"
        subtitle="これはテストのタイトルにぴったり"
      />
    ),
  },
];

export default function Schedule() {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: typeof sections[0] }) => {
    return item.render();
  };

  return (
    <ThemedView>
      <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl
  },
  tabs: {
    paddingBottom: spacing.l,
  },
  separator: {
    height: spacing.xxl,
  },
});