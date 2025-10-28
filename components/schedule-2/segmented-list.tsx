import { Colors } from '@/constants/theme';
import { useState } from 'react';
import { Text, useColorScheme, View } from 'react-native';
import SegmentedControl from 'react-native-segmented-control-2';
import type { Route, TabBarProps } from 'react-native-tab-view';
import { SceneMap, TabView } from 'react-native-tab-view';
import List from './list';

const renderScene = SceneMap({
  'academic': () => <List category="Academic Stage" />,
  'entertainment': () => <List category="Entertainment Fes" />,
});

interface MyRoute extends Route {
  key: string;
  title: string;
}

export default function MyTabsComponent() {

  const [index, setIndex] = useState(0);
  const [routes] = useState<MyRoute[]>([
    { key: 'academic', title: 'Academic Stage' },
    { key: 'entertainment', title: 'Entertainment Fes' },
  ]);

  const colorScheme = useColorScheme();
  const Color = Colors[colorScheme ?? 'light'];

  const renderCustomTabBar = (props: TabBarProps<MyRoute>) => {
    const { navigationState, jumpTo } = props;
    const { index, routes } = navigationState;

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
      <View style={{ padding: 24 }}>
        <SegmentedControl
          tabs={[AcademicStage(), EntertainmentFes()]}
          value={index}
          onChange={(newIndex) => {
            jumpTo(routes[newIndex].key);
          }}
          style={{
            height: 48,
            width: "100%",
            borderRadius: 18,
            backgroundColor: Color.backgroundPrimary,
          }}
          selectedTabStyle={{ borderRadius: 14 }}
        />
      </View>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderCustomTabBar}
    />
  );
}