import { Colors } from '@/constants/theme';
import { Text, useColorScheme, View } from 'react-native';
import SegmentedControl from 'react-native-segmented-control-2';
import { ThemedText } from '../themed-text';
import EventCarousel from './event-carousel';

interface ScheduleHeaderProps {
  value: number;
  onChange: (newIndex: number) => void;
}

export default function ScheduleHeader({ value, onChange }: ScheduleHeaderProps) {
  const colorScheme = useColorScheme();
  const Color = Colors[colorScheme ?? 'light'];

  // (AcademicStage, EntertainmentFes コンポーネントは変更なし)
  const AcademicStage = () => (
    <View style={{ /* ... */ height: '100%', justifyContent: 'center' }}>
      <Text style={{ fontWeight: "bold", color: value === 0 ? Color.backgroundPrimary : Color.textSecondary }}>
        Academic Stage
      </Text>
    </View>
  );
  const EntertainmentFes = () => (
    <View style={{ /* ... */ height: '100%', justifyContent: 'center' }}>
      <Text style={{ fontWeight: "bold", color: value === 1 ? Color.backgroundPrimary : Color.textSecondary }}>
        Entertainment Fes
      </Text>
    </View>
  );

  return (
    <>
      {/* ===== ↓ここから「コンテナの外」の要素 (背景はデフォルト) ===== */}
      <View style={{ 
          backgroundColor: Color.backgroundPrimary,
          // FlatList のマージン(24)を打ち消すネガティブマージン
          marginTop: -24,
          marginHorizontal: -24,
      }}>
        <ThemedText style={{ paddingVertical: 12, paddingHorizontal: 24, fontSize: 40, fontWeight: "700", lineHeight: 40 }}>Find</ThemedText>
        <View style={{ paddingVertical: 12 }}>
          <EventCarousel />
        </View>
      </View>

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
          value={value}
          onChange={onChange}
        />
      </View>
    </>
  );
}