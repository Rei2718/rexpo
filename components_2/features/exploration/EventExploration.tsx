import { ThemedView } from '@/components_2/core/ThemedView';
import CarouselContents from '@/components_2/features/exploration/CarouselContents';
import { CategoryTabs } from '@/components_2/features/exploration/CategoryTabs';
import { EventTagList } from '@/components_2/features/exploration/EventTagList';
import { spacing } from '@/constants/theme';
import { FlatList, StyleSheet, View } from 'react-native';

export function EventExploration() {
    const sections = [
        {
            tag: 'テクノロジー_TEST',
            title: '注目のテクノロジー',
            subtitle: 'AI・ロボティクス・未来の技術',
        },
        {
            tag: 'クリエイティブ_TEST',
            title: 'クリエイティブ展示',
            subtitle: 'デザイン・アート・映像作品',
        },
        {
            tag: 'コミュニティ_TEST',
            title: 'みんなで楽しむ',
            subtitle: 'フード・ゲーム・交流イベント',
        },
    ];

    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={sections}
                renderItem={({ item }) => (
                    <EventTagList
                        targetTag={item.tag}
                        title={item.title}
                        subtitle={item.subtitle}
                    />
                )}
                keyExtractor={(item) => item.tag}
                ListHeaderComponent={
                    <View style={styles.headerComponent}>
                        <View style={styles.tabs}>
                            <CategoryTabs />
                        </View>
                        <CarouselContents />
                    </View>
                }
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={{
                    paddingVertical: spacing.xxl,
                }}
                showsVerticalScrollIndicator={false}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabs: {
        paddingBottom: spacing.l,
    },
    headerComponent: {
        paddingBottom: spacing.xxl,
    },
    separator: {
        height: spacing.xxl,
    },
});