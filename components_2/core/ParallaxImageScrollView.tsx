import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components_2/core/ThemedView';
import { spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

type Props = PropsWithChildren<{
    headerImage: ReactElement;
}>;

export default function ParallaxImageScrollView({
    children,
    headerImage,
}: Props) {
    const { height } = useWindowDimensions();
    const headerHeight = height * 0.5;

    const backgroundColor = useThemeColor('backgroundPrimary');
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollOffset(scrollRef);
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-headerHeight, 0, headerHeight],
                        [-headerHeight / 2, 0, headerHeight * 0.75]
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-headerHeight, 0, headerHeight], [2, 1, 1]),
                },
            ],
        };
    });

    return (
        <Animated.ScrollView
            ref={scrollRef}
            style={{ backgroundColor, flex: 1 }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}>
            <Animated.View
                style={[
                    styles.header,
                    { height: headerHeight },
                    headerAnimatedStyle,
                ]}>
                {headerImage}
            </Animated.View>
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
        padding: spacing.xl,
        gap: spacing.l,
        overflow: 'hidden',
        borderTopLeftRadius: spacing.xl,
        borderTopRightRadius: spacing.xl,
        marginTop: -spacing.xl,
    },
});
