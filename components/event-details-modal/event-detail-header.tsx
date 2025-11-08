import { ThemedText } from '@/components/themed-text';
import { spacing } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';

type EventDetailHeaderProps = {
  title?: string | null;
  organizationName?: string | null;
};

export function EventDetailHeader({ title, organizationName }: EventDetailHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <ThemedText type="h3">{title}</ThemedText>
      <ThemedText type="h3" colorName="textSecondary" style={{ marginTop: spacing.xs }}>{organizationName}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.l,
  },
});