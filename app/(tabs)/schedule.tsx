import MyTabs from '@/components/screen/schedule';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScheduleScreenLayout() {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={styles.container}
    >
      <MyTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});