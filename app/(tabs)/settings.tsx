import { Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className="flex-1 items-center justify-center bg-[#000000]"
    >
      <Text className="text-xl font-bold text-blue-500">
        SettingsScreen
      </Text>
    </SafeAreaView>
  );
}
