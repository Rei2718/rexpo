import { ThemedText } from '@/components/themed-text';
import { EventDetailSection } from './event-detail-section';

type EventVenueSectionProps = {
  venueName?: string | null;
};

export function EventVenueSection({ venueName }: EventVenueSectionProps) {
  if (!venueName) {
    return null;
  }

  return (
    <EventDetailSection title="会場">
      <ThemedText type="body">{venueName}</ThemedText>
    </EventDetailSection>
  );
}