import { ThemedView } from '@/components_2/core/ThemedView';
import { spacing } from '@/constants/theme';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenLayoutProps = {
    children: React.ReactNode;
    gap?: number;
};

export function ScreenLayout({ children, gap = spacing.xl }: ScreenLayoutProps) {
    return (
        <ScrollView
            style={styles.flexOne}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
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
