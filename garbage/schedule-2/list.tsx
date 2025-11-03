import { useViewEventList } from "@/supabase/data";
import { EventCategory } from "@/supabase/data/types";
import { ActivityIndicator, FlatList, StyleProp, View, ViewStyle } from "react-native";
import { ThemedText } from "../themed-text";
import Card from "./card";
import { EventCardData } from "./types";

interface EventListProps {
  category: EventCategory;
  ListHeaderComponent?: React.ReactElement | null;
  style?: StyleProp<ViewStyle>;
}

export default function List({ category, ListHeaderComponent, style }: EventListProps) {
  const { data, isPending, isError } = useViewEventList(category);

  const renderEventCard = ({ item }: { item: EventCardData }) => (
    <View style={{ paddingHorizontal: 12 }}>
      <Card event={item} />
    </View>
  );

  const renderEmpty = () => {
    if (isPending) return null;
    const message = isError ? "データ取得に失敗しました。" : "イベントはありません。";
    return (
      <View style={{ padding: 24, alignItems: 'center' }}>
        <ThemedText type="defaultSemiBold" colorName="textSecondary">{message}</ThemedText>
      </View>
    );
  };

  const renderFooter = () => {
    if (!isPending) return null;
    return (
      <View style={{ padding: 24 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <FlatList
      data={isError ? [] : (data as EventCardData[])}
      keyExtractor={(item) => item.event_id ?? 'unknown-event'}
      renderItem={renderEventCard}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      style={style}
      contentContainerStyle={{ paddingBottom: 12 }} 
    />
  );
}