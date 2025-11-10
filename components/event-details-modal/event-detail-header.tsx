import { ThemedText } from '@/components/themed-text';
import { spacing } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';

type EventDetailHeaderProps = {
  title?: string | null;
  overview_description?: string | null;
};

export function EventDetailHeader({ title, overview_description }: EventDetailHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <ThemedText type="h1">{title}</ThemedText>
      <ThemedText type="h3" colorName="textSecondary" style={styles.overviewText}>
        {overview_description}国内最大手のLorem ipsum
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.l,
    alignItems: 'center',
  },
  overviewText: {
    marginTop: spacing.xxs,
  },
});