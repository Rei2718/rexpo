import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

interface EventDetailsAboutProps {
  description: string | null;
}

export default function EventDetailsAbout({description}: EventDetailsAboutProps) {
  return(
    <View>
      <ThemedText type="label" colorName="textPrimary">概要</ThemedText>
      <ThemedText type="default" colorName="textSecondary" style={{ paddingTop: 12 }}>{description}</ThemedText>
    </View>
  )
}