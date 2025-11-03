import { ThemedText } from "@/components/themed-text";
import { FALLBACK_IMAGE_URL } from "@/constants/assets";
import { Colors } from "@/constants/theme";
import { formatTime } from "@/utils/date";
import {
  msArrowForwardIos,
  msSchedule,
} from "@material-symbols-react-native/rounded-200";
import { Link } from "expo-router";
import { MsIcon } from "material-symbols-react-native";
import { Image, TouchableOpacity, useColorScheme, View } from "react-native";
import { ThemedView } from "../themed-view";
import { EventCardData } from "./types";

interface EventCardProps {
  event: EventCardData;
}

export default function EventCard({ event }: EventCardProps) {
  const colorScheme = useColorScheme();
  const timeSlots = event.time_slots;

  return (
    <View>
      <Link
        href={{
          pathname: "/test-modal",
          params: { id: event.event_id },
        }}
        asChild
      >
        <TouchableOpacity activeOpacity={0.8}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 12,
              borderRadius: 24,
              marginBottom: 6,
              backgroundColor: Colors[colorScheme ?? 'light'].backgroundPrimary,
            }}
          >
            <Image
              source={
                event.cover_image_url
                  ? { uri: event.cover_image_url }
                  : FALLBACK_IMAGE_URL
              }
              style={{
                width: 72,
                height: 72,
                borderRadius: 12,
                marginRight: 24,
              }}
            />

            <View style={{ flex: 1, marginRight: 24 }}>
              <ThemedText type="title" numberOfLines={2}>
                {event.title}
              </ThemedText>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 6,
                }}
              >
                <View style={{ marginRight: 6 }}>
                  <MsIcon
                    icon={msSchedule}
                    color={Colors[colorScheme ?? 'light'].textPrimary}
                    size={16}
                  />
                </View>
                {timeSlots && timeSlots.length > 0 && (
                  <ThemedText
                    type="subtitle"
                    colorName="textSecondary"
                    numberOfLines={1}
                  >
                    {`${formatTime(timeSlots[0].start_datetime)} - ${formatTime(timeSlots[0].end_datetime)}`}
                  </ThemedText>
                )}
              </View>
            </View>
            <ThemedView
              colorName="backgroundSecondary"
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MsIcon
                icon={msArrowForwardIos}
                size={12}
                color={Colors[colorScheme ?? 'light'].textPrimary}
              />
            </ThemedView>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
}