import { HapticTab } from '@/components_2/core/HapticTab';
import { Colors } from '@/constants/theme';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import { msHome, msHomeFill, msSchedule, msScheduleFill } from "@material-symbols-react-native/rounded-200";
import { MsIcon } from 'material-symbols-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].accent,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].backgroundPrimary,
          borderTopWidth: 0,
          elevation: 0, // Android
          shadowOpacity: 0, // iOS
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Main',
          tabBarIcon: ({ color, focused }) => (
            focused
              ? <MsIcon icon={msHomeFill} color={color} size={36} />
              : <MsIcon icon={msHome} color={color} size={36} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, focused }) => (
            focused
              ? <MsIcon icon={msScheduleFill} color={color} size={32} />
              : <MsIcon icon={msSchedule} color={color} size={32} />
          ),
        }}
      />
      {/*
      <Tabs.Screen
        name="foods"
        options={{
          title: 'Foods',
          tabBarIcon: ({ color, focused }) => (
            focused
              ? <MsIcon icon={msFastfoodFill} color={color} size={30} />
              : <MsIcon icon={msFastfood} color={color} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            focused
              ? <MsIcon icon={msSettingsFill} color={color} size={32} />
              : <MsIcon icon={msSettings} color={color} size={32} />
          ),
        }}
      />
      */}
    </Tabs>
  );
}
