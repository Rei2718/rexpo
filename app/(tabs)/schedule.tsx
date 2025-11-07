import CarouselContents from '@/components/schedule/carousel-contents';
import { CategoryTabs } from '@/components/schedule/category-tabs';
import { EventTagListContainer } from '@/components/schedule/event-tag-list-container';
import { ThemedText } from '@/components/themed-text';
import { spacing } from '@/constants/theme';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScheduleHeader = () => (
  <View style={styles.container}>
    <ThemedText type="h1" style={styles.title}>
      イベント
    </ThemedText>
  </View>
);

const sections = [
  {
    key: 'header',
    render: () => <ScheduleHeader />,
  },
  {
    key: 'categoryTabs',
    render: () => <CategoryTabs />,
  },
  {
    key: 'carousel',
    render: () => <CarouselContents />,
  },
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
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
  },
  title: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.l,
  },
  separator: {
    height: spacing.xxl,
  },
});