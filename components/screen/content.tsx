import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useViewEventList } from "@/supabase/data";
import { EventCategory } from "@/supabase/data/types";
import { msFavorite } from "@material-symbols-react-native/rounded-200";
import { Link } from "expo-router";
import { MsIcon } from 'material-symbols-react-native';
import { FlatList, Image, Text, TouchableOpacity, useColorScheme, View } from "react-native";

type TimeSlot = {
  id: string;
  event_id: string;
  start_datetime: string;
  end_datetime: string;
  created_at: string;
  updated_at: string;
};

type Performer = {
  id: string;
  name: string;
  avatar_url: string | null;
  role: string | null;
};

export default function Content({ category }: { category: EventCategory }) {
  const { data, isPending, isError } = useViewEventList(category);
  const colorScheme = useColorScheme();

  if (isPending) {
    return (
      <Text>読み込み中...</Text>
    );
  }

  if (isError) {
    return (
      <Text>データの取得に失敗しました。</Text>
    );
  }

  return(
    <FlatList
      data={data}
      keyExtractor={(item) => item.event_id ?? 'unknown-event'}
      renderItem={({ item }) => {
        const timeSlots = item.time_slots as TimeSlot[] | null;
        const performers = item.performers as Performer[] | null;

        return (
          <View style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
              {timeSlots?.map((slot) => {
                const formatTime = (timeString: string) => {
                  if (!timeString) return '';
                  const parts = timeString.split(':');
                  if (parts.length >= 2) {
                    return parts[0] + ':' + parts[1];
                  }
                  return timeString;
                };
                return (
                  <ThemedText key={slot.id} type="label" colorName="textSecondary" style={{ marginLeft: 24 }}>
                    {formatTime(slot.start_datetime)} - {formatTime(slot.end_datetime)}
                  </ThemedText>
                );
              })}
            </View>
            <Link
              href={{
                pathname: "/test-modal",
                params: { id: item.event_id }
              }}
              asChild
            >
              <TouchableOpacity activeOpacity={0.9}>
                <ThemedView style={{ borderRadius: 24, padding: 24 }} colorName="backgroundSecondary">
                  <View style={{ paddingBottom: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <ThemedText type="subtitle">{item.title}</ThemedText>
                      <MsIcon icon={msFavorite} color={Colors[colorScheme ?? 'light'].accent} size={24} />
                    </View>
                    <ThemedText type="default" colorName="textSecondary" style={{ marginTop: 8, width: "90%" }}>
                      {item.description}
                    </ThemedText>
                  </View>
                  <View>
                    {performers?.map((performer) => (
                      <View key={performer.id} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                        <Image source={{ uri: performer.avatar_url ?? undefined }} style={{ width: 36, height: 36, borderRadius: 18, marginRight: 18 }} />
                        <View style={{ flex: 1 }}>
                          <ThemedText type="default">{performer.name}</ThemedText>
                          {performer.role && (
                            <ThemedText type="default" colorName="textSecondary" style={{ marginTop: 0 }}>{performer.role}</ThemedText>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                </ThemedView>
              </TouchableOpacity>
            </Link>
          </View>
        );
      }}
      ListEmptyComponent={<Text>イベントはありません。</Text>}
    />
  )
}