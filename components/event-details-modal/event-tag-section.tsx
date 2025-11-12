import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { radii, spacing } from '@/constants/theme';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

export function EventTagSection({ tags }: { tags: string[] | null }) {
  if (!tags) {
    return null;
  }

  return (
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
            pathname: '/event-tag-modal',
            params: { tagName: tag },
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
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    gap: spacing.s,
    paddingHorizontal: spacing.xl,
  },
  tabContainer: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderRadius: radii.pill,
  },
});