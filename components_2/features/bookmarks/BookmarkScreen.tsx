import { ThemedText } from '@/components_2/core/ThemedText';
import { ThemedView } from '@/components_2/core/ThemedView';
import { BookmarkList } from '@/components_2/features/bookmarks/BookmarkList';
import { spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

const renderScene = SceneMap({
    events: () => <BookmarkList type="event" />,
    food: () => <BookmarkList type="food" />,
});

export function BookmarkScreen() {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'events', title: 'Events' },
        { key: 'food', title: 'Food' },
    ]);

    const backgroundColor = useThemeColor('backgroundPrimary');
    const textColor = useThemeColor('textPrimary');
    const indicatorColor = useThemeColor('accent');

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <View style={styles.header}>
                    <ThemedText type="h1" style={styles.title}>
                        ブックマーク
                    </ThemedText>
                </View>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={(props: any) => (
                        <TabBar
                            {...props}
                            style={{ backgroundColor, elevation: 0, shadowOpacity: 0 }}
                            renderLabel={({ route, color }: { route: { title: string }; color: string }) => (
                                <ThemedText style={{ color: textColor, fontWeight: '600' }}>
                                    {route.title}
                                </ThemedText>
                            )}
                            indicatorStyle={{ backgroundColor: indicatorColor }}
                        />
                    )}
                />
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        paddingHorizontal: spacing.l,
        paddingBottom: spacing.m,
    },
    title: {
        marginTop: spacing.s,
    },
});
