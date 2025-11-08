import { ThemedText } from '@/components/themed-text';
import { EventDetailSection } from './event-detail-section';

type EventDescriptionSectionProps = {
  description?: string | null;
  overview?: string | null;
};

export function EventDescriptionSection({ description, overview }: EventDescriptionSectionProps) {
  const content = description ?? overview ?? '概要はありません。';

  return (
    <EventDetailSection title="概要">
      <ThemedText type="body">{content}</ThemedText>
    </EventDetailSection>
  );
}