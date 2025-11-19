import { ThemedText } from '@/components_2/core/ThemedText';
import { spacing } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';

type EventSectionProps = {
    title: string;
    children?: React.ReactNode;
};

export function EventSection({ title, children }: EventSectionProps) {
    if (!children) {
        return null;
    }

    return (
        <View>
            <ThemedText type="h2" colorName="textPrimary" style={styles.container}>{title}</ThemedText>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.xl,
    },
    content: {
        marginTop: spacing.m,
    },
});
