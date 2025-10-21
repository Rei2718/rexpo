import { Sponsor } from '@/components/event-details/types';
import { ThemedText } from "@/components/themed-text";
import { Image } from 'expo-image';
import { View } from "react-native";

interface EventDetailsTitleProps {
  title: string | null;
  sponsors: Sponsor[] | null;
}

export default function EventDetailsTitle({ title, sponsors }: EventDetailsTitleProps) {
  return(
    <View>
      <ThemedText type="ExtraLargeTitle">
        {title}
      </ThemedText>
      {sponsors && sponsors.length > 0 && (
        <View style={{ paddingTop: 12, gap: 8 }}>
          {sponsors.map((sponsor) => (
            <View key={sponsor.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemedText type="label" colorName="textSecondary">Sponsored By</ThemedText>
              {sponsor.logo_url && (
                <Image
                  source={{ uri: sponsor.logo_url }}
                  style={{ width: 24, height: 24, borderRadius: 12, marginHorizontal: 12 }}
                  contentFit='contain'
                />
              )}
              <ThemedText type="label" colorName="textSecondary">{sponsor.name}</ThemedText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}