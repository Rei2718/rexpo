import { Colors } from "@/constants/theme";
import { useViewEventList } from "@/supabase/data";
import { ActivityIndicator, FlatList, useColorScheme, View } from "react-native";
import { ThemedText } from "../themed-text";
import EventList from "./event-list";
import { EventCardData } from "./types";

export function AcademicStage() {
  const colorScheme = useColorScheme();
  const Color = Colors[colorScheme ?? 'light'];
  const { data, isPending, isError } = useViewEventList("Academic Stage");

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
        <ThemedText>イベントの読み込みに失敗しました。</ThemedText>
      </View>
    );
  }

  const renderItem = ({ item }: { item: EventCardData }) => (
    <EventList event={item} />
  );

  return(
    <View>
      <FlatList
        data={data as EventCardData[] || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.event_id}
        contentContainerStyle={{ paddingVertical: 24 }}
      />
    </View>
  )
}