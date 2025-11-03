import { StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import { ThemedText } from './themed-text';

type ParallaxScrollImageViewProps = {
  children: React.ReactNode;
  headerContent: React.ReactNode;
};

export default function ParallaxScrollView({ children, headerContent }: ParallaxScrollImageViewProps) {
  const { height } = useWindowDimensions();
  const HEADER_HEIGHT = height * 0.6;
  const colorScheme = useColorScheme();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={{ flex: 1 }}
      scrollEventThrottle={16}>
      <View style={{ height: HEADER_HEIGHT }} >
        <Animated.View
          style={[
            styles.header,
            headerAnimatedStyle,
        ]}>
          {headerContent}
        </Animated.View>
        <LinearGradient
          colors={['transparent', Colors[colorScheme ?? 'light'].backgroundPrimary ]}
          style={{
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: 24,
          }}
        >
          <ThemedText
            type="title"
            style={{
              fontWeight: 'bold',
              color: Colors[colorScheme ?? 'light'].textPrimary
            }}
          >
            200以上のイベントをチェック。
          </ThemedText>
          <ThemedText
            type="body"
            style={{
              color: Colors[colorScheme ?? 'light'].textSecondary,
              marginTop: 4
            }}
          >
            エンタメ・アカデミックも。あなたの意のままに
          </ThemedText>
        </LinearGradient>
      </View>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
});