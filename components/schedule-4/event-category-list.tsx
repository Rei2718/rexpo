import { Colors } from "@/constants/theme";
import { useViewEventList } from "@/supabase/data";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import { ThemedText } from "../themed-text";
import EventListAbout from "./event-list-about";
import { EventCardData } from "./types";

interface EventCategoryListProps {
  category: "Academic Stage" | "Entertainment Fes";
}

export default function EventCategoryList({ category }: EventCategoryListProps) {
  const colorScheme = useColorScheme();
  const Color = Colors[colorScheme ?? 'light'];
  const { data, isPending, isError } = useViewEventList(category);

  if (isPending) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <ActivityIndicator color={Color.textPrimary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ padding: 24 }}>
        <ThemedText style={{ textAlign: 'center' }}>イベントの読み込みに失敗しました。</ThemedText>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={{ padding: 24 }}>
        <ThemedText style={{ textAlign: 'center' }}>{category}にはイベントがありません。</ThemedText>
      </View>
    );
  }

  const validEvents = data.filter(event =>
    event.event_id !== null &&
    event.title !== null &&
    event.description !== null
  );

  if (validEvents.length === 0) {
    return (
      <View style={{ padding: 24 }}>
        <ThemedText style={{ textAlign: 'center' }}>{category}には表示可能なイベントがありません。</ThemedText>
      </View>
    );
  }

  return (
    <View>
      {validEvents.slice(0, 6).map((event) => (
        <EventListAbout
          key={event.event_id!}
          event={event as EventCardData}
        />
      ))}
    </View>
  );
}