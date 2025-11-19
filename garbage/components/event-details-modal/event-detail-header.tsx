import { ThemedText } from '@/components/themed-text';
import { spacing } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';

type EventDetailHeaderProps = {
  title?: string | null;
  overview_description?: string | null;
  sponsorTier?: string | null;
};

export function EventDetailHeader({
  title,
  overview_description,
  sponsorTier,
}: EventDetailHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <ThemedText type="caption" colorName="textAccent" style={styles.sponcorText}>
        プラチナブーススポンサー
      </ThemedText>
      <ThemedText type="h1">{title}</ThemedText>
      <ThemedText type="h3" colorName="textSecondary">
        {overview_description}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.l,
    alignItems: 'center',
  },
  sponcorText: {
    marginTop: spacing.xxs,
  },
});