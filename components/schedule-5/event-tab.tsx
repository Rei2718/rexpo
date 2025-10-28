import { Colors } from '@/constants/theme';
import { useState } from 'react';
import { useColorScheme, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView, type TabBarProps } from 'react-native-tab-view';
import { AcademicStage } from './academic-stage';
import { EntertainmentFes } from './entertainment-fes';

const renderScene = SceneMap({
  AcademicStage: AcademicStage,
  EntertainmentFes: EntertainmentFes,
});

type Route = {
  key: string;
  title: string;
};

const routes = [
  { key: 'AcademicStage', title: 'Academic Stage' },
  { key: 'EntertainmentFes', title: 'Entertainment Fes' },
];

export function RenderTabBar (props: TabBarProps<Route>) {
  const colorScheme = useColorScheme();
  const Color = Colors[colorScheme ?? 'light'];
  const { width } = props.layout;
  const tabCount = 2;
  const indicatorMargin = 4;

  let tabWidth: number | undefined = undefined;
  let indicatorWidth: number | undefined = undefined;

  if (width > 0) {
    tabWidth = width / tabCount;
    indicatorWidth = tabWidth - (indicatorMargin * 2);
  }

  return(
    <TabBar
      {...props}
      scrollEnabled={false}
      indicatorStyle={{
        height: 40,
        borderRadius: 20,
        backgroundColor: Color.textPrimary,
        marginVertical: indicatorMargin,
        marginHorizontal: indicatorMargin,
        width: indicatorWidth
      }}
      indicatorContainerStyle={{
        backgroundColor: Color.backgroundSecondary,
        height: 48,
        borderRadius: 24
      }}
      style={{ height: 48, backgroundColor: Color.backgroundPrimary, shadowOpacity: 0, elevation: 0 }}
      tabStyle={{
        width: tabWidth
      }}
      activeColor={Color.backgroundSecondary}
      inactiveColor={Color.textSecondary}
    />
  )
};

export default function EventTab() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={RenderTabBar}
    />
  );
}