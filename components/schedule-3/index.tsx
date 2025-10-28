import { useState } from 'react';
import type { Route } from 'react-native-tab-view';
import { SceneMap, TabView } from 'react-native-tab-view';
import EventList from './event-list';
import SegmentedTabBar from './segmented-tab-bar';

const renderScene = SceneMap({
  'academic': () => <EventList category="Academic Stage" />,
  'entertainment': () => <EventList category="Entertainment Fes" />,
});

interface RouteLayout extends Route {
  key: string;
  title: string;
}

export default function Index() {
  const [index, setIndex] = useState(0);
  const [routes] = useState<RouteLayout[]>([
    { key: 'academic', title: 'Academic Stage' },
    { key: 'entertainment', title: 'Entertainment Fes' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => <SegmentedTabBar {...props} />}
    />
  );
}