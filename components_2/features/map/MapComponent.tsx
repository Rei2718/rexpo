import { ThemedText } from '@/components_2/core/ThemedText';
import { Colors, radii, spacing } from '@/constants/theme';
import { GetVenues } from '@/supabase/data/types';
import React, { useMemo } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getMapStyle } from './mapStyle';

interface MapComponentProps {
    venues: GetVenues[] | null | undefined;
    onVenueSelect: (venueId: string) => void;
    selectedVenueId?: string;
}

export function MapComponent({ venues, onVenueSelect, selectedVenueId }: MapComponentProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const mapStyle = useMemo(() => getMapStyle(theme), [theme]);

    const initialRegion = {
        latitude: 35.681236,
        longitude: 139.767125,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
                showsMyLocationButton={false}
                showsCompass={false}
                toolbarEnabled={false}
                customMapStyle={mapStyle}
            >
                {venues?.map((venue) => (
                    <Marker
                        key={venue.id}
                        coordinate={{
                            latitude: venue.map_latitude ?? 0,
                            longitude: venue.map_longitude ?? 0,
                        }}
                        onPress={() => onVenueSelect(venue.id)}
                        pinColor={selectedVenueId === venue.id ? theme.accent : theme.icon}
                    >
                        <Callout tooltip>
                            <View style={[styles.calloutContainer, { backgroundColor: theme.backgroundPrimary, borderColor: theme.separator }]}>
                                <ThemedText type="label" style={{ color: theme.textPrimary }}>
                                    {venue.name}
                                </ThemedText>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    calloutContainer: {
        padding: spacing.s,
        borderRadius: radii.m,
        borderWidth: 1,
        minWidth: 100,
        alignItems: 'center',
        justifyContent: 'center',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Elevation for Android
        elevation: 5,
        marginBottom: spacing.xs,
    },
});
