import { EventTagListContainer } from '@/components/schedule/event-tag-list-container';
import { ThemedText } from '@/components/themed-text';
import { CATEGORY_MAP } from '@/constants/category-map';
import { spacing } from '@/constants/theme';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function CategoryModal() {
  const { categoryName } = useLocalSearchParams<{ categoryName: string }>();
  const headerHeight = useHeaderHeight();

  if (!categoryName) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText>カテゴリ名が指定されていません。</ThemedText>
      </View>
    );
  }

  const specificTags = CATEGORY_MAP[categoryName] || [];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: categoryName,
        }}
      />
      <ScrollView
        contentContainerStyle={{
          paddingTop: headerHeight + spacing.xl,
          paddingBottom: spacing.xxl,
        }}
      >
        {specificTags.length > 0 ? (
          <View style={styles.contentContainer}>
            {specificTags.map((tagInfo) => (
              <EventTagListContainer
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
    </>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    gap: spacing.xxl,
  },
  paddingView: {
    padding: spacing.xl,
  },
});