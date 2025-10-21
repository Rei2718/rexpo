import EventDetailsAbout from '@/components/event-details/event-details-about';
import EventDetailsCoverImage from '@/components/event-details/event-details-cover-image';
import EventDetailsPerformers from '@/components/event-details/event-details-performers';
import EventDetailsTime from '@/components/event-details/event-details-time';
import EventDetailsTitle from '@/components/event-details/event-details-title';
import EventDetailsVenue from '@/components/event-details/event-details-venue';
import { Performer, Sponsor, TimeSlot, Venue } from '@/components/event-details/types';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useViewEventDetails } from '@/supabase/data';
import { useHeaderHeight } from '@react-navigation/elements';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

export default function EventDetailsModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError } = useViewEventDetails(id);
  const headerHeight = useHeaderHeight();

  if (isPending) return <ThemedText>読み込み中</ThemedText>;
  if (isError) return <ThemedText>イベントの読み込みに失敗しました。</ThemedText>;

  if (data) {
    return (
      <ScrollView contentContainerStyle={{ paddingTop: headerHeight }}>
        <ThemedView style={{ flex: 1, paddingHorizontal: 24, paddingBottom: 24, paddingTop: 12, gap: 36 }}>
          <EventDetailsCoverImage cover_image_url={data.cover_image_url} event_type={data.event_type} />
          <EventDetailsTitle title={data.title} sponsors={data.sponsors as Sponsor[] | null} />
          <EventDetailsAbout description={data.description} />
          <EventDetailsPerformers performers={data.performers as Performer[] | null} />
          <EventDetailsVenue venue={data.venue as Venue | null} />
          <EventDetailsTime timeSlots={data.time_slots as TimeSlot[] | null} />
        </ThemedView>
      </ScrollView>
    );
  }

  return <ThemedText>イベントが見つかりません。</ThemedText>;
}