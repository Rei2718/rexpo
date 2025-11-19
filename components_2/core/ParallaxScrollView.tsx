import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollOffset,
} from 'react-native-reanimated';

import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

type Props = PropsWithChildren<{
    headerImage: ReactElement;
    headerHeight: number;
    headerColorName?: keyof (typeof Colors)['light'];
}>;

export default function ParallaxScrollView({
    children,
    headerImage,
    headerHeight,
    headerColorName = 'backgroundPrimary',
}: Props) {
    const backgroundColor = useThemeColor('backgroundPrimary');
    const headerBackgroundColor = useThemeColor(headerColorName);

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollOffset(scrollRef);

    const headerAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [-headerHeight / 2, 0, headerHeight * 0.5]
        );

        const scale = interpolate(
            scrollOffset.value,
            [-headerHeight, 0],
            [1.5, 1],
            Extrapolation.CLAMP
        );

        return {
            transform: [
                { translateY },
                { scale },
            ],
        };
    });

    return (
        <Animated.ScrollView
            ref={scrollRef}
            style={[{ backgroundColor }, styles.container]}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}>
            <Animated.View
                style={[
                    styles.header,
                    { backgroundColor: headerBackgroundColor },
                    { height: headerHeight },
                    headerAnimatedStyle,
                ]}>
                {headerImage}
            </Animated.View>
            <View style={styles.content}>{children}</View>
        </Animated.ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        overflow: 'hidden',
    },
    content: {
        overflow: 'hidden',
    },
});
