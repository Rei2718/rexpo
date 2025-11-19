import { ThemedView } from '@/components_2/core/ThemedView';
import CarouselContents from '@/components_2/features/schedule/CarouselContents';
import { CategoryTabs } from '@/components_2/features/schedule/CategoryTabs';
import { EventTagList } from '@/components_2/features/schedule/EventTagList';
import { PresetDropdown } from '@/components_2/features/schedule/PresetDropdown';
import { SCHEDULE_PRESETS, SchedulePresetSection } from '@/constants/schedule-presets';
import { spacing } from '@/constants/theme';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScheduleHeader = ({
    activePresetId,
    onSelectPreset,
    topInset,
}: {
    activePresetId: string;
    onSelectPreset: (id: string) => void;
    topInset: number;
}) => (
    <View style={{ paddingTop: topInset }}>
        <PresetDropdown
            presets={SCHEDULE_PRESETS}
            activePresetId={activePresetId}
            onSelectPreset={onSelectPreset}
        />
        <View style={styles.tabs}>
            <CategoryTabs />
        </View>
        <View>
            <CarouselContents />
        </View>
    </View>
);

export default function ScheduleScreen() {
    const insets = useSafeAreaInsets();
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
