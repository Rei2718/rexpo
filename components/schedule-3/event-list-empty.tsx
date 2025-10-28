import { ActivityIndicator } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

interface EventListEmptyProps {
  isLoading: boolean;
  isFetching: boolean;
  dataLength: number;
  isError: boolean;
}

export default function EventListEmpty({ isLoading, isFetching, dataLength, isError }: EventListEmptyProps) {
  if (isError) {
    return (
      <ThemedView style={{ marginTop: 40, alignItems: 'center' }}>
        <ThemedText>データの取得に失敗しました。</ThemedText>
      </ThemedView>
    );
  }

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (!isFetching && dataLength === 0) {
    return (
      <ThemedView>
        <ThemedText>イベントがありません。</ThemedText>
      </ThemedView>
    );
  }

  return null;
}