import EventTab from "@/components/schedule-5/event-tab";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      <ThemedText type="ExtraLargeTitle" style={{ paddingBottom: 24 }}>Planning</ThemedText>
      <ThemedView colorName="backgroundPrimary">
        <EventTab />
      </ThemedView>
    </SafeAreaView>
  );
}
