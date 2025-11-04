import { CATEGORY_NAMES } from '@/constants/category-map';
import { spacing } from '@/constants/theme';
import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

export function CategoryTabs() {
  return (
    <ThemedView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.scrollContainer}
      >
        {CATEGORY_NAMES.map((categoryName) => (
          <Link
            key={categoryName}
            href={{
              pathname: '/category-modal',
              params: { categoryName: categoryName },
            }}
            asChild
          >
            <Pressable>
              <ThemedView
                colorName="backgroundTertiary"
                style={styles.tabContainer}
              >
                <ThemedText type="label">{categoryName}</ThemedText>
              </ThemedView>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: spacing.xl,
    gap: spacing.s,
  },
  tabContainer: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderRadius: 99,
  },
});