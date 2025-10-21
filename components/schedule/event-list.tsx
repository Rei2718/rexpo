import { useViewEventList } from "@/supabase/data";
import { EventCategory } from "@/supabase/data/types";
import { FlatList } from "react-native";
import { ThemedText } from "../themed-text";
import EventCard from "./event-card";
import { EventCardData } from "./types";

export default function EventList({ category }: { category: EventCategory }) {
  const { data, isPending, isError } = useViewEventList(category);

  if (isPending) {
    return (
      <ThemedText type="defaultSemiBold" colorName="textPrimary">読み込み中...</ThemedText>
    );
  }

  if (isError) {
    return (
      <ThemedText type="defaultSemiBold" colorName="textPrimary">データ取得に失敗しました。</ThemedText>
    );
  }

  const renderEventCard = ({ item }: { item: EventCardData }) => (
    <EventCard event={item} />
  );

  return(
    <FlatList
      data={data as EventCardData[]}
      keyExtractor={(item) => item.event_id ?? 'unknown-event'}
      renderItem={renderEventCard}
      ListEmptyComponent={<ThemedText type="defaultSemiBold" colorName="textPrimary">イベントはありません。</ThemedText>}
      contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 16 }}
    />
  );
}