import { ThemedText } from '@/components_2/core/ThemedText';
import { spacing, typography } from '@/constants/theme';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

export function ScheduleHeader() {
    const { height } = useWindowDimensions();
    const gradientHeight = height * 0.4;

    return (
        <View
            style={[
                styles.container,
                {
                    height: gradientHeight,
                    marginTop: -gradientHeight,
                }
            ]}
        >
            <ThemedText style={typography.h1} colorName="textPrimary">
                200以上のイベントをチェック。エンタメ・アカデミックも。あなたの意のままに
            </ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        padding: spacing.xl,
    },
});
