import { ThemedText } from '@/components/themed-text';
import { spacing } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';

export function ErrorComponent() {
  return (
    <View style={styles.container}>
      <ThemedText type="label" colorName="textSecondary">
        データの取得に失敗しました。
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
});