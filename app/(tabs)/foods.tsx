import { SafeAreaView } from "react-native-safe-area-context";

export default function FoodsScreen() {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{ flex: 1 }}
    >
    </SafeAreaView>
  );
}