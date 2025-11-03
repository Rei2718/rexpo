import { Colors } from '@/constants/theme';
import { useRef, useState } from 'react';
import { Text, useColorScheme, View } from 'react-native';
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';
import SegmentedControl from 'react-native-segmented-control-2';
import { ThemedText } from '../themed-text';
import EventCarousel from './event-carousel';
import EventList from './event-list';

export default function SegmentedList() {
  const [index, setIndex] = useState(0);
  const colorScheme = useColorScheme();
  const pagerRef = useRef<PagerView>(null);
  const Color = Colors[colorScheme ?? 'light'];

  const handleTabChange = (newIndex: number) => {
    setIndex(newIndex);
    pagerRef.current?.setPage(newIndex);
  };

  const handlePageSelected = (event: PagerViewOnPageSelectedEvent) => {
    setIndex(event.nativeEvent.position);
  };

  const AcademicStage = () => (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'center',
      height: '100%'
    }}>
      <Text style={{
        fontWeight: "bold",
        color: index === 0 ? Color.backgroundPrimary : Color.textSecondary
      }}>
        Academic Stage
      </Text>
    </View>
  );

  const EntertainmentFes = () => (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'center',
      height: '100%'
    }}>
      <Text style={{
        fontWeight: "bold",
        color: index === 1 ? Color.backgroundPrimary : Color.textSecondary
      }}>
        Entertainment Fes
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ThemedText style={{ paddingVertical: 12, paddingHorizontal: 24, fontSize: 40, fontWeight: "700", lineHeight: 40 }}>Find</ThemedText>
      <View style={{ paddingVertical: 12 }}>
        <EventCarousel />
      </View>
      <View style={{ flex: 1, backgroundColor: Color.backgroundSecondary, margin: 24, borderRadius: 30 }}>
        <View style={{ padding: 12 }}>
          <SegmentedControl
            style={{
              height: 48,
              width: "100%",
              borderRadius: 18,
              backgroundColor: Colors[colorScheme ?? 'light'].backgroundPrimary,
            }}
            selectedTabStyle={{ borderRadius: 14 }}
            tabs={[AcademicStage(), EntertainmentFes()]}
            gap={5}
            value={index}
            onChange={handleTabChange}
          />
        </View>
        <PagerView
          ref={pagerRef}
          style={{ flex: 1}}
          initialPage={0}
          onPageSelected={handlePageSelected}
        >
          <EventList key="1" category="Academic Stage" />
          <EventList key="2" category="Entertainment Fes" />
        </PagerView>
      </View>
    </View>
  );
}