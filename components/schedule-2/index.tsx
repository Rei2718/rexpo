import { View } from "react-native";
import Header from "./header";
import SegmentedList from "./segmented-list";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <SegmentedList />
    </View>
  );
}