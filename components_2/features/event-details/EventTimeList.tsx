import { ThemedText } from '@/components_2/core/ThemedText';
import { spacing } from '@/constants/theme';
import { GetEventDetailsById } from '@/supabase/data/types';
import { formatTime } from '@/utils/date';
import { StyleSheet } from 'react-native';
import { EventSection } from './EventSection';

type TimeSlot = {
    id: string;
    start: string;
    end: string;
};

type EventTimeListProps = {
    times: GetEventDetailsById['times'];
};

export function EventTimeList({ times }: EventTimeListProps) {
    const timeList = times as TimeSlot[] | null;

    if (!timeList || timeList.length === 0) {
        return null;
    }

    return (
        <EventSection title="開催時間">
            {timeList.map((slot) => (
                <ThemedText key={slot.id} type="body" style={styles.timeText}>
                    {formatTime(slot.start)} - {formatTime(slot.end)}
                </ThemedText>
            ))}
        </EventSection>
    );
}

const styles = StyleSheet.create({
    timeText: {
        marginTop: spacing.xs,
    },
});
