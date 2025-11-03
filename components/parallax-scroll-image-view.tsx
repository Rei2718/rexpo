import { useThemeColor } from '@/hooks/use-theme-color';
import type { PropsWithChildren, ReactElement } from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';
import { ThemedView } from './themed-view';

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerChildren: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollImageView({
  children,
  headerChildren,
  headerImage,
}: Props) {
  const { height } = useWindowDimensions();
  const HEADER_HEIGHT = height * 0.8;
  const backgroundColor = useThemeColor({}, 'backgroundPrimary');
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
      style={{ backgroundColor, flex: 1 }}
      scrollEventThrottle={16}>
      <Animated.View
        style={[
          { height: HEADER_HEIGHT, overflow: 'hidden' },
          headerAnimatedStyle,
        ]}>
        {headerImage}
      </Animated.View>
      <ThemedView style={{ flex: 1 }}>
        {headerChildren}
        {children}
      </ThemedView>
    </Animated.ScrollView>
  );
}