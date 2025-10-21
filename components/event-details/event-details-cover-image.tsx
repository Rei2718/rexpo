import { ThemedView } from "@/components/themed-view";
import { FALLBACK_IMAGE_URL } from "@/constants/assets";
import { Colors } from "@/constants/theme";
import { msBookmark } from "@material-symbols-react-native/rounded-200";
import { Image } from 'expo-image';
import { MsIcon } from "material-symbols-react-native";
import { useColorScheme, View } from "react-native";
import { ThemedText } from "../themed-text";

interface EventDetailsCoverImageProps {
  cover_image_url: string | null;
  event_type: string | null;
}

export default function EventDetailsCoverImage({ cover_image_url, event_type }: EventDetailsCoverImageProps) {
  const colorScheme = useColorScheme();

  return(
    <View style={{ position: 'relative', width: '100%', aspectRatio: 1 }}>
      <Image
        source={cover_image_url ? { uri: cover_image_url } : FALLBACK_IMAGE_URL}
        style={{ width: '100%', height: '100%', borderRadius: 24 }}
      />
      <ThemedView
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 48,
          height: 48,
          borderRadius: 24,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MsIcon icon={msBookmark} color={Colors[colorScheme ?? 'light'].textPrimary} size={32} />
      </ThemedView>
      <ThemedView
        colorName="backgroundPrimary"
        style={{
          alignSelf: 'center',
          padding: 6,
          borderRadius: 22.5,
          marginTop: -22.5,
        }}
      >
        <ThemedView
          colorName="backgroundSecondary"
          style={{
            height: 33,
            minWidth: 200,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16.5,
            paddingHorizontal: 15,
          }}
        >
          <ThemedText type="label" colorName="textPrimary">{event_type}</ThemedText>
        </ThemedView>
      </ThemedView>
    </View>
  )
}