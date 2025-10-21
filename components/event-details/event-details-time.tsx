import { TimeSlot } from "@/components/event-details/types";
import { ThemedText } from "@/components/themed-text";
import { formatTime } from "@/utils/date";
import { View } from "react-native";

interface EventDetailsTimeProps {
  timeSlots: TimeSlot[] | null;
}

export default function EventDetailsTime({ timeSlots }: EventDetailsTimeProps) {
  if (!timeSlots || timeSlots.length === 0) {
    return null;
  }

  return (
    <View>
      <ThemedText type="label" colorName="textPrimary">時間</ThemedText>
      <View style={{ paddingTop: 12, gap: 4 }}>
        {timeSlots.map((slot) => (
          <ThemedText key={slot.id} type="default">
            {formatTime(slot.start_datetime)} - {formatTime(slot.end_datetime)}
          </ThemedText>
        ))}
      </View>
    </View>
  );
}