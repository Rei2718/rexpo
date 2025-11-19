import { ThemedText } from '@/components_2/core/ThemedText';
import { ThemedView } from '@/components_2/core/ThemedView';
import { EventTagList } from '@/components_2/features/schedule/EventTagList';
import { CATEGORY_MAP } from '@/constants/category-map';
import { spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function CategoryModal() {
  const { categoryName } = useLocalSearchParams<{ categoryName: string }>();
  const headerBackgroundColor = useThemeColor('backgroundPrimary');
  const headerTextColor = useThemeColor('textPrimary');

  if (!categoryName) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText>カテゴリ名が指定されていません。</ThemedText>
      </View>
    );
  }

  const specificTags = CATEGORY_MAP[categoryName] || [];

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: categoryName,
          headerStyle: { backgroundColor: headerBackgroundColor },
          headerTintColor: headerTextColor,
        }}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {specificTags.length > 0 ? (
          <View style={styles.scrollViewContent}>
            {specificTags.map((tagInfo) => (
              <EventTagList
                key={tagInfo.title}
                targetTag={tagInfo.tag}
                title={tagInfo.title}
                subtitle={tagInfo.subtitle}
              />
            ))}
          </View>
        ) : (
          <View style={styles.paddingView}>
            <ThemedText>「{categoryName}」に関連する情報はありません。</ThemedText>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingVertical: spacing.xl,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    gap: spacing.xxl,
  },
  paddingView: {
    padding: spacing.xl,
  },
});