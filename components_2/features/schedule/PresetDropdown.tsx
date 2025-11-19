import { ThemedText } from '@/components_2/core/ThemedText';
import { ThemedView } from '@/components_2/core/ThemedView';
import { spacing } from '@/constants/theme';
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

    const handleSelect = (presetId: string) => {
        onSelectPreset(presetId);
        setVisible(false);
    };

    return (
        <View>
            <Pressable onPress={() => setVisible(true)} style={styles.trigger}>
                <ThemedText type="h1">{activePreset.label}</ThemedText>
                <Ionicons name="chevron-down" size={24} color={iconColor} />
            </Pressable>

            <Modal
                transparent
                visible={visible}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        padding: spacing.xl,
        paddingBottom: spacing.xxl,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        width: '80%',
        borderRadius: spacing.m,
        padding: spacing.s,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.m,
        borderRadius: spacing.s,
    },
});
