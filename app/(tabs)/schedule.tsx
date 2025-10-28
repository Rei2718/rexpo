import EventTab from '@/components/schedule-5/event-tab';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Schedule() {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{ flex: 1, paddingHorizontal: 24 }}
    >
      <ThemedText type="ExtraLargeTitle" style={{ paddingVertical: 24 }}>Planning</ThemedText>
      <ThemedView colorName="backgroundPrimary" style={{ flex: 1 }}>
        <EventTab />
      </ThemedView>
    </SafeAreaView>
  );
}