import { ThemedText } from '@/components_2/core/ThemedText';
import { Colors, spacing } from '@/constants/theme';
import { useGetVenues } from '@/supabase/data';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapComponent from './MapComponent';
import { VenueEventList } from './VenueEventList';

export default function MapScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const insets = useSafeAreaInsets();
    const { data: venues } = useGetVenues();
    const [selectedVenueId, setSelectedVenueId] = useState<string | undefined>(undefined);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Bottom Sheet Refs
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['30%', '90%'], []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
        })();
    }, []);

    const handleVenueSelect = useCallback((venueId: string) => {
        setSelectedVenueId(venueId);
        bottomSheetRef.current?.snapToIndex(1);
    }, []);

    const backgroundStyle = {
        backgroundColor: theme.backgroundPrimary,
    };

    const handleIndicatorStyle = {
        backgroundColor: theme.icon,
    };

    const dynamicStyles = {
        contentContainer: {
            backgroundColor: theme.backgroundPrimary,
        },
        emptyStateText: {
            color: theme.textSecondary,
        },
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.mapContainer}>
                <MapComponent
                    venues={venues}
                    onVenueSelect={handleVenueSelect}
                    selectedVenueId={selectedVenueId}
                />
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                backgroundStyle={backgroundStyle}
                handleIndicatorStyle={handleIndicatorStyle}
                topInset={insets.top}
            >
                <BottomSheetView style={[styles.contentContainer, dynamicStyles.contentContainer]}>
                    {selectedVenueId ? (
                        <VenueEventList venueId={selectedVenueId} />
                    ) : (
                        <View style={styles.emptyState}>
                            <ThemedText type="label" style={dynamicStyles.emptyStateText}>
                                {errorMsg ? errorMsg : "まだ何も選択されていません"}
                            </ThemedText>
                        </View>
                    )}
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
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
