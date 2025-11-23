
import { HapticTab } from '@/components_2/core/HapticTab';
import { Colors } from '@/constants/theme';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import { msBookmark, msBookmarkFill, msExplore, msExploreFill, msHome, msHomeFill, msPinDrop, msPinDropFill } from "@material-symbols-react-native/rounded-200";
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
        name="exploration"
        options={{
          title: 'Exploration',
          tabBarIcon: ({ color, focused }) => (
            focused
              ? <MsIcon icon={msExploreFill} color={color} size={32} />
              : <MsIcon icon={msExplore} color={color} size={32} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }) => (
            focused
              ? <MsIcon icon={msPinDropFill} color={color} size={32} />
              : <MsIcon icon={msPinDrop} color={color} size={32} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'Bookmarks',
          tabBarIcon: ({ color, focused }) => (
            focused
              ? <MsIcon icon={msBookmarkFill} color={color} size={32} />
              : <MsIcon icon={msBookmark} color={color} size={32} />
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
