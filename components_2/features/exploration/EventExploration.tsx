import { ThemedView } from '@/components_2/core/ThemedView';
import CarouselContents from '@/components_2/features/exploration/CarouselContents';
import { CategoryTabs } from '@/components_2/features/exploration/CategoryTabs';
import { EventTagList } from '@/components_2/features/exploration/EventTagList';
import { EXPLORATION_PRESETS, ExplorationPresetSection } from '@/constants/exploration-presets';
import { spacing } from '@/constants/theme';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function EventExploration() {
    const activePreset = EXPLORATION_PRESETS[0];

    const renderItem = ({ item }: { item: ExplorationPresetSection }) => {
        switch (item.type) {
            case 'tag-list':
                return (
                    <EventTagList
                        targetTag={item.tag}
                        title={item.title}
                        subtitle={item.subtitle}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={activePreset.sections}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <View style={styles.headerComponent}>
                        <View style={styles.tabs}>
                            <CategoryTabs />
                        </View>
                        <CarouselContents />
                    </View>
                }
                ListFooterComponent={<SafeAreaView edges={['bottom']} />}
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
        paddingTop: spacing.xl,
        paddingBottom: spacing.xxl,
    },
    separator: {
        height: spacing.xxl,
    },
});