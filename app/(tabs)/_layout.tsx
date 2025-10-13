import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { msFastfood, msFastfoodFill, msHome, msHomeFill, msSchedule, msScheduleFill, msSettings, msSettingsFill } from "@material-symbols-react-native/rounded-200";
import { MsIcon } from 'material-symbols-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopWidth: 0,
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
    </Tabs>
  );
}
