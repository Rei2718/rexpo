import { ThemedText } from '@/components/themed-text';
import { spacing } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';

type EventDetailSectionProps = {
  title: string;
  children?: React.ReactNode;
};

export function EventDetailSection({ title, children }: EventDetailSectionProps) {
  if (!children) {
    return null;
  }

  return (
    <View>
      <ThemedText type="h2" colorName="textPrimary" style={styles.container}>{title}</ThemedText>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
  },
  content: {
    marginTop: spacing.m,
  },
});