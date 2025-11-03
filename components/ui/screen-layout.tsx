import { spacing } from '@/constants/theme';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '../themed-view';

type ScreenLayoutProps = {
  children: React.ReactNode;
  gap?: number;
};

export function ScreenLayout({ children, gap = spacing.xl }: ScreenLayoutProps) {
  return (
    <ScrollView
      style={styles.flexOne}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView
        edges={["top", "bottom"]}
        style={styles.flexOne}
      >
        <ThemedView style={[styles.container, { gap: gap }]}>
          {children}
        </ThemedView>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});