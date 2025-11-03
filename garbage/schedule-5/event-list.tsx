import { ThemedText } from "@/components/themed-text";
import { FALLBACK_IMAGE_URL } from "@/constants/assets";
import { Colors } from "@/constants/theme";
import { msArrowForwardIos, msSchedule } from "@material-symbols-react-native/rounded-200";
import { Link } from "expo-router";
import { MsIcon } from "material-symbols-react-native";
import { Image, TouchableOpacity, useColorScheme, View } from "react-native";
import { ThemedView } from "../themed-view";
import { EventCardData } from "./types";

interface EventCardProps {
  event: EventCardData;
}

export default function EventList ({ event }: EventCardProps) {
  const colorScheme = useColorScheme();

  return(
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
              marginBottom: 12,
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
              </View>
            </View>
            <ThemedView
              colorName="backgroundPrimary"
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
                size={18}
                color={Colors[colorScheme ?? 'light'].textSecondary}
              />
            </ThemedView>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  )
}