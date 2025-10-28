import { View } from "react-native";
import { ThemedText } from "../themed-text";

export default function EventListHeader() {
  return (
    <View>
      <ThemedText style={{ padding: 24, fontSize: 40, fontWeight: "700", lineHeight: 40 }}>Find</ThemedText>
    </View>
  );
}