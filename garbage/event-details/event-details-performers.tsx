import { Performer } from "@/components/event-details/types";
import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";
import EventDetailsPerformerItem from "./event-details-performer-item";

interface EventDetailsPerformersProps {
  performers: Performer[] | null;
}

export default function EventDetailsPerformers({ performers }: EventDetailsPerformersProps) {
  if (!performers || performers.length === 0) {
    return null;
  }

  return (
    <View>
      <ThemedText type="label" colorName="textPrimary">出演者</ThemedText>
      <View style={{ paddingTop: 12, gap: 12 }}>
        {performers.map((performer) => (
          <EventDetailsPerformerItem key={performer.id} performer={performer} />
        ))}
      </View>
    </View>
  );
}