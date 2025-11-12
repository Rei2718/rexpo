import { EventTagListContainer } from '@/components/event-tag-modal/event-tag-list-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function EventTagModal() {
  const { tagName } = useLocalSearchParams<{ tagName: string }>();
  const headerBackgroundColor = useThemeColor('backgroundPrimary');
  const headerTextColor = useThemeColor('textPrimary');

  if (!tagName) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText>タグ名が指定されていません。</ThemedText>
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: tagName,
          headerStyle: { backgroundColor: headerBackgroundColor },
          headerTintColor: headerTextColor,
        }}
      />
      <EventTagListContainer targetTag={tagName} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
});