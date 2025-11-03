import { Venue } from "@/components/event-details/types";
import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

interface EventDetailsVenueProps {
  venue: Venue | null;
}

export default function VenueSection({ venue }: EventDetailsVenueProps) {
  if (!venue) {
    return null;
  }

  return (
    <View>
      <ThemedText type="label" colorName="textPrimary">会場</ThemedText>
      <ThemedText type="body" style={{ paddingTop: 12 }}>
        {venue.name} (収容人数: {venue.capacity ?? 'N/A'})
      </ThemedText>
    </View>
  );
}