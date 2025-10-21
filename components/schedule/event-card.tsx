import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { formatTime } from '@/utils/date';
import { msFavorite } from "@material-symbols-react-native/rounded-200";
import { Link } from "expo-router";
import { MsIcon } from 'material-symbols-react-native';
import { Image, TouchableOpacity, useColorScheme, View } from "react-native";
import { EventCardData } from "./types";

interface EventCardProps {
  event: EventCardData;
}

export default function EventCard({ event }: EventCardProps) {
  const colorScheme = useColorScheme();
  const timeSlots = event.time_slots;
  const performers = event.performers;

  return (
    <View style={{ marginBottom: 24 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
        {timeSlots?.map((slot) => (
          <ThemedText key={slot.id} type="label" colorName="textSecondary" style={{ marginLeft: 24 }}>
            {formatTime(slot.start_datetime)} - {formatTime(slot.end_datetime)}
          </ThemedText>
        ))}
      </View>
      <Link
        href={{
          pathname: "/test-modal",
          params: { id: event.event_id }
        }}
        asChild
      >
        <TouchableOpacity activeOpacity={0.9}>
          <ThemedView style={{ borderRadius: 24, padding: 24 }} colorName="backgroundSecondary">
            <View style={{ paddingBottom: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <ThemedText type="subtitle">{event.title}</ThemedText>
                <MsIcon icon={msFavorite} color={Colors[colorScheme ?? 'light'].accent} size={24} />
              </View>
              <ThemedText type="default" colorName="textSecondary" style={{ marginTop: 8, width: "90%" }}>
                {event.description}
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
}