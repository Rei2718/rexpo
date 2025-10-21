import { Performer } from "@/components/event-details/types";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { FALLBACK_IMAGE_URL } from "@/constants/assets";
import { Colors } from "@/constants/theme";
import { msArrowForwardIos } from "@material-symbols-react-native/rounded-200";
import { Image as ExpoImage } from 'expo-image';
import { MsIcon } from "material-symbols-react-native";
import { useColorScheme, View } from "react-native";

interface PerformerItemProps {
  performer: Performer;
}

export default function EventDetailsPerformerItem({ performer }: PerformerItemProps) {
  const colorScheme = useColorScheme();

  return (
    <ThemedView
      colorName="backgroundSecondary"
      style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        width: "100%", padding: 6, borderRadius: 24,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ExpoImage
          source={
            performer.avatar_url
              ? { uri: performer.avatar_url }
              : FALLBACK_IMAGE_URL
          }
          style={{ width: 36, height: 36, borderRadius: 18, marginRight: 12 }}
        />
        <View>
          <ThemedText type="default">{performer.name}</ThemedText>
          {performer.role && (
            <ThemedText type="default" colorName="textSecondary">
              {performer.role}
            </ThemedText>
          )}
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 12 }}>
        <ThemedText type="default" colorName="textPrimary" style={{ marginRight: 4 }}>
          Check More
        </ThemedText>
        <MsIcon
          icon={msArrowForwardIos}
          color={Colors[colorScheme ?? 'light'].textPrimary}
          size={12}
        />
      </View>
    </ThemedView>
  );
}