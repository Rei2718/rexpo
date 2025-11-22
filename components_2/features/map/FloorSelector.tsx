import { ThemedText } from '@/components_2/core/ThemedText';
import { Colors, radii, spacing } from '@/constants/theme';
import React from 'react';
import { Pressable, StyleSheet, View, useColorScheme } from 'react-native';

interface FloorSelectorProps {
    selectedFloor: string;
    onSelectFloor: (floor: string) => void;
    floors: string[];
}

export function FloorSelector({ selectedFloor, onSelectFloor, floors }: FloorSelectorProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
            {floors.map((floor, index) => {
                const isSelected = floor === selectedFloor;
                return (
                    <React.Fragment key={floor}>
                        <Pressable
                            onPress={() => onSelectFloor(floor)}
                            style={[
                                styles.button,
                                isSelected && { backgroundColor: theme.accent }
                            ]}
                        >
                            <ThemedText
                                type="label"
                                style={[
                                    styles.text,
                                    isSelected ? { color: theme.backgroundPrimary } : { color: theme.textPrimary }
                                ]}
                            >
                                {floor}
                            </ThemedText>
                        </Pressable>
                        {index < floors.length - 1 && (
                            <View style={[styles.divider, { backgroundColor: theme.backgroundTertiary }]} />
                        )}
                    </React.Fragment>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: radii.m,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        flexDirection: 'column',
    },
    button: {
        paddingVertical: spacing.s,
        paddingHorizontal: spacing.m,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 44,
        minHeight: 44,
    },
    text: {
        fontWeight: '600',
    },
    divider: {
        height: 1,
        width: '100%',
    },
});
