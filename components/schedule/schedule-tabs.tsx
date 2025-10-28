import { Colors } from '@/constants/theme';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useColorScheme, View } from 'react-native';
import { ThemedText } from '../themed-text';
import EventCarousel from './event-carousel';
import EventList from "./event-list";

const Tab = createMaterialTopTabNavigator();

export default function ScheduleTabs() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <ThemedText style={{ padding: 24, fontSize: 40, fontWeight: "700", lineHeight: 40 }}>Find</ThemedText>
      <EventCarousel />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: false,
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].backgroundPrimary,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].textPrimary,
          tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].textSecondary,
          tabBarIndicatorStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].accent,
            height: 1.5,
          },
        }}
      >
        <Tab.Screen
          name="Academic Stage"
          component={() => <EventList category="Academic Stage" />}
        />
        <Tab.Screen
          name="Entertainment Fes"
          component={() => <EventList category="Entertainment Fes" />}
        />
      </Tab.Navigator>
    </View>
  );
}