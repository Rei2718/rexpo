import EventListEmpty from '@/components/schedule-3/event-list-empty';
import EventListItem from '@/components/schedule-3/event-list-item';
import { EventCardData } from '@/components/schedule-3/types';
import { Colors } from '@/constants/theme';
import { useViewEventList } from '@/supabase/data';
import { EventCategory } from '@/supabase/data/types';
import { FlatList, useColorScheme } from 'react-native';

interface ListProps {
  category: EventCategory;
}

export default function EventList({ category }: ListProps) {
  const { data, isPending, isError } = useViewEventList(category);
  const colorScheme = useColorScheme();
  const Color = Colors[colorScheme ?? 'light'];

  return (
    <FlatList
      data={data as EventCardData[]}
      keyExtractor={(item: EventCardData) => item.event_id}
      renderItem={({ item }) => <EventListItem item={item} />}
      ListEmptyComponent={() => (
        <EventListEmpty
          isLoading={isPending}
          isFetching={isPending}
          dataLength={(data || []).length}
          isError={isError}
        />
      )}
      style={{ backgroundColor: Color.backgroundSecondary, padding: 16 }}
    />
  );
}