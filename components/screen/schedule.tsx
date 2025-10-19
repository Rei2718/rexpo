import { Colors } from '@/constants/theme';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useColorScheme, View } from 'react-native';
import Content from './content';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].backgroundPrimary,
          elevation: 0, // Android
          shadowOpacity: 0, // iOS
        },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].textPrimary,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].textSecondary,
        tabBarIndicatorStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].accent,
          height: 1.5,
        },
      }}
    >
      <Tab.Screen name="Academic Stage" component={AcademicStageScreen} />
      <Tab.Screen name="Entertainment Fes" component={EntertainmentFesScreen} />
    </Tab.Navigator>
  );
}

function AcademicStageScreen() {
  return (
    <View
      style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 16 }}
    >
      <Content category="Academic Stage"/>
    </View>
  );
}

function EntertainmentFesScreen() {
  return (
    <View
      style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 16 }}
    >
      <Content category="Entertainment Fes"/>
    </View>
  );
}