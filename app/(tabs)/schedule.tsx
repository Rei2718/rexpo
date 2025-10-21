import ScheduleTabs from '@/components/schedule/schedule-tabs';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Schedule() {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={styles.container}
    >
      <ScheduleTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});