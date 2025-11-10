import { ThemedText } from '@/components/themed-text';
import { spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';
import { EventDetailSection } from './event-detail-section';

type EventDescriptionSectionProps = {
  description?: string | null;
  overview?: string | null;
};

export function EventDescriptionSection({ description, overview }: EventDescriptionSectionProps) {
  const content = description ?? overview ?? '情報がありません。';

  return (
    <EventDetailSection title="概要">
      <ThemedText type="body" style={styles.container} colorName="textSecondary">
        {content}
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure pariatur quod laboriosam expedita, iste alias inventore, tempore debitis accusamus mollitia voluptatibus eum, ea laudantium. Corrupti sed culpa commodi eaque rerum?
      </ThemedText>
    </EventDetailSection>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
  },
});