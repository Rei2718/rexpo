import { ThemedText } from '@/components_2/core/ThemedText';
import { ThemedView } from '@/components_2/core/ThemedView';
import { radii, spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { PresetDropdownProps } from './types';

export function PresetDropdown({ presets, activePresetId, onSelectPreset }: PresetDropdownProps) {
    const [visible, setVisible] = useState(false);
    const activePreset = presets.find((p) => p.id === activePresetId) || presets[0];
    const iconColor = useThemeColor('textPrimary');
    const backgroundColor = useThemeColor('backgroundSecondary');

    const overlayColor = useThemeColor('overlay');

    const handleSelect = (presetId: string) => {
        onSelectPreset(presetId);
        setVisible(false);
    };

    return (
        <View>
            <View style={styles.trigger}>
                <Pressable onPress={() => setVisible(true)} style={styles.content}>
                    <ThemedText type="h1">{activePreset.label}</ThemedText>
                    <Ionicons name="chevron-down" size={24} color={iconColor} />
                </Pressable>
            </View>

            <Modal
                transparent
                visible={visible}
                statusBarTranslucent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable style={[styles.overlay, { backgroundColor: overlayColor }]} onPress={() => setVisible(false)}>
                    <ThemedView style={styles.dropdown} colorName="backgroundPrimary">
                        {presets.map((preset) => (
                            <Pressable
                                key={preset.id}
                                style={[
                                    styles.item,
                                    preset.id === activePresetId && { backgroundColor },
                                ]}
                                onPress={() => handleSelect(preset.id)}
                            >
                                <ThemedText>{preset.label}</ThemedText>
                                {preset.id === activePresetId && (
                                    <Ionicons name="checkmark" size={20} color={iconColor} />
                                )}
                            </Pressable>
                        ))}
                    </ThemedView>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    trigger: {
        padding: spacing.xl,
        paddingBottom: spacing.xxl,
        alignItems: 'flex-start',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        width: '80%',
        borderRadius: radii.m,
        padding: spacing.s,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.m,
        borderRadius: radii.s,
    },
});
