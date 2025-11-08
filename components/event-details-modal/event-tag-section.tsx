import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { spacing } from '@/constants/theme';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { EventDetailSection } from './event-detail-section';

export function EventTagSection({ tags }: { tags: string[] | null }) {
  if (!tags) {
    return null;
  }

  return (
    <EventDetailSection title="タグ">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.scrollContainer}
      >
        {tags.map((tag) => (
          <Link
            key={tag}
            href={{
              pathname: '/category-modal',
              params: { categoryName: tag },
            }}
            asChild
          >
            <Pressable>
              <ThemedView
                colorName="backgroundTertiary"
                style={styles.tabContainer}
              >
                <ThemedText type="label">{tag}</ThemedText>
              </ThemedView>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </EventDetailSection>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    gap: spacing.s,
  },
  tabContainer: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderRadius: 99,
  },
});