import { Colors } from '@/constants/theme';
import { useRef, useState } from 'react';
import { useColorScheme, View } from 'react-native';
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';
import SegmentedControl from 'react-native-segmented-control-2';
import { ThemedText } from '../themed-text';
import EventCategoryList from './event-category-list';

const CARD_HEIGHT = 102
const MAX_CARDS = 6;
const PAGER_HEIGHT = CARD_HEIGHT * MAX_CARDS + 6;

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
      <ThemedText
        type="label"
        style={{
          fontWeight: "bold",
          color: index === 0 ? Color.backgroundSecondary : Color.textSecondary
        }}
      >
        Academic Stage
      </ThemedText>
    </View>
  );

  const EntertainmentFes = () => (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'center',
      height: '100%'
    }}>
      <ThemedText
        type="label"
        style={{
          fontWeight: "bold",
          color: index === 1 ? Color.backgroundSecondary : Color.textSecondary
        }}
      >
        Entertainment Fes
      </ThemedText>
    </View>
  );

  return (
    <View style={{ backgroundColor: Color.backgroundPrimary }}>
      <View style={{ padding: 24 }}>
        <SegmentedControl
          style={{
            height: 48,
            width: "100%",
            borderRadius: 24,
            backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
          }}
          selectedTabStyle={{ borderRadius: 18, backgroundColor: Colors[colorScheme ?? 'light'].textPrimary }}
          tabs={[AcademicStage(), EntertainmentFes()]}
          gap={5}
          value={index}
          onChange={handleTabChange}
        />
      </View>
      <PagerView
        ref={pagerRef}
        style={{ height: PAGER_HEIGHT }}
        initialPage={0}
        onPageSelected={handlePageSelected}
      >
        <EventCategoryList key="1" category="Academic Stage" />
        <EventCategoryList key="2" category="Entertainment Fes" />
      </PagerView>
    </View>
  );
}