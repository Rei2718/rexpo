import { ThemedText } from '@/components_2/core/ThemedText';
import { Colors, spacing } from '@/constants/theme';
import { useGetVenues } from '@/supabase/data';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FloorSelector } from './FloorSelector';
import MapComponent from './MapComponent';
import { VenueEventList } from './VenueEventList';

const SNAP_POINTS = ['30%', '90%'];
const FLOORS = ['1F', '2F'];

export default function MapScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const insets = useSafeAreaInsets();
    const { data: venues } = useGetVenues();
    const [selectedVenueId, setSelectedVenueId] = useState<string | undefined>(undefined);
    const [selectedFloor, setSelectedFloor] = useState('1F');
    const bottomSheetRef = useRef<BottomSheet>(null);

    useLocationPermission();

    const handleVenueSelect = useCallback((venueId: string) => {
        setSelectedVenueId(venueId);
        bottomSheetRef.current?.snapToIndex(0);
    }, []);

    const snapPoints = useMemo(() => SNAP_POINTS, []);

    const filteredVenues = useMemo(() => {
        if (!venues) return [];
        return venues.filter(venue => {
            if (!venue.floor) return false;
            const floorStr = String(venue.floor);
            // Match '1F' with '1F', '1', or 1
            return floorStr === selectedFloor || floorStr + 'F' === selectedFloor;
        });
    }, [venues, selectedFloor]);

    const selectedVenue = useMemo(() => {
        return venues?.find(v => v.id === selectedVenueId);
    }, [venues, selectedVenueId]);

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.mapContainer}>
                <MapComponent
                    venues={filteredVenues}
                    onVenueSelect={handleVenueSelect}
                    selectedVenueId={selectedVenueId}
                />
                <View style={[styles.floorSelectorContainer, { top: insets.top + spacing.m }]}>
                    <FloorSelector
                        selectedFloor={selectedFloor}
                        onSelectFloor={setSelectedFloor}
                        floors={FLOORS}
                    />
                </View>
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                backgroundStyle={{ backgroundColor: theme.backgroundPrimary }}
                handleIndicatorStyle={{ backgroundColor: theme.icon }}
                topInset={insets.top}
                enableDynamicSizing={false}
            >
                <BottomSheetView style={[styles.contentContainer, { backgroundColor: theme.backgroundPrimary }]}>
                    {selectedVenueId && selectedVenue ? (
                        <View style={styles.sheetContainer}>
                            <View style={styles.venueHeader}>
                                <ThemedText type="h2">{selectedVenue.name}</ThemedText>
                                {selectedVenue.description && (
                                    <ThemedText type="body" style={{ color: theme.textSecondary }}>
                                        {selectedVenue.description}
                                    </ThemedText>
                                )}
                            </View>
                            <VenueEventList venueId={selectedVenueId} />
                        </View>
                    ) : (
                        <EmptyState theme={theme} />
                    )}
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
}

function useLocationPermission() {
    useEffect(() => {
        (async () => {
            await Location.requestForegroundPermissionsAsync();
        })();
    }, []);
}

function EmptyState({ theme }: { theme: typeof Colors.light }) {
    return (
        <View style={styles.emptyState}>
            <ThemedText type="label" style={{ color: theme.textSecondary }}>
                まだ何も選択されていません
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapContainer: {
        height: '76%',
        width: '100%',
    },
    floorSelectorContainer: {
        position: 'absolute',
        right: spacing.m,
    },
    contentContainer: {
        flex: 1,
    },
    sheetContainer: {
        gap: spacing.xl,
        paddingVertical: spacing.xl,
    },
    venueHeader: {
        paddingHorizontal: spacing.xl,
        gap: spacing.xs,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: spacing.xl,
    },
});
