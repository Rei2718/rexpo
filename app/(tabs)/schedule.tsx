import CarouselContents from '@/components/schedule/carousel-contents';
import { CategoryTabs } from '@/components/schedule/components/category-tabs';
import { EventTagListContainer } from '@/components/schedule/components/event-tag-list-container';
import { ThemedText } from '@/components/themed-text';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { spacing } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';

export default function Schedule() {
  return (
    <ScreenLayout gap={spacing.xxl}>
      <View style={styles.container}>
        <ThemedText type="h1" style={styles.title}>
          イベント
        </ThemedText>
        <CategoryTabs />
        <CarouselContents />
      </View>
      <EventTagListContainer
        targetTag="テストタグ-ファースト"
        title="テストタグ-ファースト"
        subtitle="これはテストのタイトルにぴったり"
      />
      <EventTagListContainer
        targetTag="テストタグ-ファースト"
        title="テストタグ-ファースト"
        subtitle="これはテストのタイトルにぴったり"
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl
  },
  title: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.l,
  },
});