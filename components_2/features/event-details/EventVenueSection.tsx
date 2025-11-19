import { ThemedText } from '@/components_2/core/ThemedText';
import { EventSection } from './EventSection';

type EventVenueSectionProps = {
    venueName?: string | null;
};

export function EventVenueSection({ venueName }: EventVenueSectionProps) {
    if (!venueName) {
        return null;
    }

    return (
        <EventSection title="会場">
            <ThemedText type="body">{venueName}</ThemedText>
        </EventSection>
    );
}
