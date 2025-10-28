import { TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { EventCardData } from "./types";

interface EventListItemProps {
  item: EventCardData;
}

export default function EventListItem({ item }: EventListItemProps) {
  return(
    <TouchableOpacity style={{ paddingHorizontal: 0, paddingVertical: 100, borderBottomWidth: 1, borderBottomColor: '#EFEFEF', backgroundColor: 'white' }}>
      <ThemedView style={{ flex: 1 }}>
        <ThemedText>{item.title}</ThemedText>
        <ThemedText numberOfLines={1}>{item.description}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  )
}