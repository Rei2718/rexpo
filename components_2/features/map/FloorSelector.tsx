import { ThemedText } from '@/components_2/core/ThemedText';
import { ThemedView } from '@/components_2/core/ThemedView';
import { radii, spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

interface FloorSelectorProps {
    selectedFloor: string;
    onSelectFloor: (floor: string) => void;
    floors: string[];
}

export function FloorSelector({ selectedFloor, onSelectFloor, floors }: FloorSelectorProps) {
    const backgroundPrimary = useThemeColor('backgroundPrimary');
    const accent = useThemeColor('accent');
    const textPrimary = useThemeColor('textPrimary');

    return (
        <ThemedView style={styles.container} colorName="backgroundPrimary">
            {floors.map((floor, index) => {
                const isSelected = floor === selectedFloor;
                return (
                    <React.Fragment key={floor}>
                        <Pressable
                            onPress={() => onSelectFloor(floor)}
                            style={[
                                styles.button,
                                isSelected && { backgroundColor: accent }
                            ]}
                        >
                            <ThemedText
                                type="label"
                                style={[
                                    isSelected ? { color: backgroundPrimary } : { color: textPrimary }
                                ]}
                            >
                                {floor}
                            </ThemedText>
                        </Pressable>
                        {index < floors.length - 1 && (
                            <ThemedView style={styles.divider} colorName="backgroundTertiary" />
                        )}
                    </React.Fragment>
                );
            })}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: radii.m,
        overflow: 'hidden',
        flexDirection: 'column',
    },
    button: {
        paddingVertical: spacing.s,
        paddingHorizontal: spacing.m,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: spacing.xxl, // 48, close to 44
        minHeight: spacing.xxl, // 48
    },
    divider: {
        height: 1,
        width: '100%',
    },
});
