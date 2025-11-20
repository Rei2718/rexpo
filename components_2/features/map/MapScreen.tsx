import { ThemedText } from '@/components_2/core/ThemedText';
import { ThemedView } from '@/components_2/core/ThemedView';
import { Colors, spacing } from '@/constants/theme';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { VenueEventList } from './VenueEventList';
import { VenueGrid } from './VenueGrid';

export function MapScreen() {
    const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['10%', '40%', '90%'], []);
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const handleVenueSelect = (venueId: string) => {
        setSelectedVenueId(venueId);
        // Optional: Snap to 40% or 90% when a venue is selected
        bottomSheetRef.current?.snapToIndex(1);
    };

    return (
        <ThemedView style={styles.container}>
            {/* Background Content: Venue Grid */}
            <View style={styles.mapContainer}>
                <VenueGrid
                    onVenueSelect={handleVenueSelect}
                    selectedVenueId={selectedVenueId ?? undefined}
                />
            </View>

            {/* Bottom Sheet */}
            <BottomSheet
                ref={bottomSheetRef}
                index={1} // Initial position: 40%
                snapPoints={snapPoints}
                backgroundStyle={{ backgroundColor: theme.backgroundPrimary }}
                handleIndicatorStyle={{ backgroundColor: theme.icon }}
            >
                <BottomSheetView style={styles.contentContainer}>
                    {selectedVenueId ? (
                        <VenueEventList venueId={selectedVenueId} />
                    ) : (
                        <View style={styles.emptyState}>
                            <ThemedText type="label" style={{ color: theme.textSecondary }}>
                                まだ何も選択されていません
                            </ThemedText>
                        </View>
                    )}
                </BottomSheetView>
            </BottomSheet>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapContainer: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        padding: spacing.m,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: spacing.xl,
    },
});
