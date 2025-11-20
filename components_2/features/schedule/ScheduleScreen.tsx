import { ThemedView } from '@/components_2/core/ThemedView';
import CarouselContents from '@/components_2/features/schedule/CarouselContents';
import { CategoryTabs } from '@/components_2/features/schedule/CategoryTabs';
import { EventTagList } from '@/components_2/features/schedule/EventTagList';
import { PresetDropdown } from '@/components_2/features/schedule/PresetDropdown';
import { SCHEDULE_PRESETS, SchedulePresetSection } from '@/constants/schedule-presets';
import { spacing } from '@/constants/theme';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScheduleHeader = ({
    activePresetId,
    onSelectPreset,
}: {
    activePresetId: string;
    onSelectPreset: (id: string) => void;
}) => (
    <View>
        <PresetDropdown
            presets={SCHEDULE_PRESETS}
            activePresetId={activePresetId}
            onSelectPreset={onSelectPreset}
        />
        <View style={styles.tabs}>
            <CategoryTabs />
        </View>
        <CarouselContents />
    </View>
);

export default function ScheduleScreen() {
    const [activePresetId, setActivePresetId] = useState(SCHEDULE_PRESETS[0].id);
    const activePreset = SCHEDULE_PRESETS.find((p) => p.id === activePresetId) || SCHEDULE_PRESETS[0];

    const renderItem = ({ item }: { item: SchedulePresetSection }) => {
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
                    <SafeAreaView edges={['top']}>
                        <ScheduleHeader
                            activePresetId={activePresetId}
                            onSelectPreset={setActivePresetId}
                        />
                    </SafeAreaView>
                }
                ListHeaderComponentStyle={styles.headerComponent}
                ListFooterComponent={<SafeAreaView edges={['bottom']} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={{
                    paddingBottom: spacing.xxl,
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
        marginBottom: spacing.xxl,
    },
    separator: {
        height: spacing.xxl,
    },
});
