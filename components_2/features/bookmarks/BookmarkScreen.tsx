import { ThemedText } from '@/components_2/core/ThemedText';
import { ThemedView } from '@/components_2/core/ThemedView';
import { BookmarkList } from '@/components_2/features/bookmarks/BookmarkList';
import { spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

const renderScene = SceneMap({
    events: () => <BookmarkList type="event" />,
    food: () => <BookmarkList type="food" />,
});

export function BookmarkScreen() {
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
            <SafeAreaView edges={['top']}>
                <View style={styles.header}>
                    <ThemedText type="h1">
                        ブックマーク
                    </ThemedText>
                </View>
            </SafeAreaView>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}

                renderTabBar={(props: any) => (
                    <TabBar
                        {...props}
                        style={{ backgroundColor, elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 }}
                        renderLabel={({ route }: { route: { title: string } }) => (
                            <ThemedText type="h2" style={{ color: textColor }}>
                                {route.title}
                            </ThemedText>
                        )}
                        indicatorStyle={{ backgroundColor: indicatorColor }}
                    />
                )}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: spacing.xl,
    },
});
