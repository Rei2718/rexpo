import { Colors } from '@/constants/theme';
import { useColorScheme, View } from 'react-native';
import SegmentedControl from 'react-native-segmented-control-2';
import type { Route, TabBarProps } from 'react-native-tab-view';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';
import EventListHeader from './event-list-header';

interface MyRoute extends Route {
  key: string;
  title: string;
}

export default function SegmentedTabBar(props: TabBarProps<MyRoute>) {
  const { navigationState, jumpTo } = props;
  const { index: activeIndex, routes: tabRoutes } = navigationState;

  const colorScheme = useColorScheme();
  const Color = Colors[colorScheme ?? 'light'];

  const tabs = tabRoutes.map((route, i) => (
    <View
      key={route.key}
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <ThemedText colorName={activeIndex === i ? "backgroundPrimary" : "textSecondary" }>
        {route.title}
      </ThemedText>
    </View>
  ));

  return (
    <View>
      <EventListHeader />
      <ThemedView colorName="backgroundSecondary" style={{ padding: 8 }}>
        <SegmentedControl
          tabs={tabs}
          value={activeIndex}
          onChange={(newIndex) => {
            jumpTo(tabRoutes[newIndex].key);
          }}
          style={{ height: 48, width: '100%', borderRadius: 18, backgroundColor: Color.backgroundPrimary}}
          selectedTabStyle={{ borderRadius: 14 }}
        />
      </ThemedView>
    </View>
  );
}