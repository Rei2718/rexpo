import { ThemedText } from '@/components_2/core/ThemedText';
import { Colors, radii, spacing } from '@/constants/theme';
import React, { useMemo, useRef } from 'react';
import { StyleSheet, View, useColorScheme, useWindowDimensions } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getMapStyle } from './mapStyle';
import { MapComponentProps } from './types';

export default function MapComponent({ venues, onVenueSelect, selectedVenueId }: MapComponentProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const mapStyle = useMemo(() => getMapStyle(theme), [theme]);

    const mapRef = useRef<MapView>(null);
    const initialRegion = {
        latitude: 43.057447,
        longitude: 141.388781,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    };

    const PAN_LIMIT = 0.0005;
    const { height } = useWindowDimensions();

    const setBoundaries = () => {
        if (mapRef.current) {
            const boundary = {
                northEast: {
                    latitude: initialRegion.latitude + PAN_LIMIT,
                    longitude: initialRegion.longitude + PAN_LIMIT,
                },
                southWest: {
                    latitude: initialRegion.latitude - PAN_LIMIT,
                    longitude: initialRegion.longitude - PAN_LIMIT,
                },
            };
            mapRef.current.setMapBoundaries(boundary.northEast, boundary.southWest);
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={initialRegion}
                showsUserLocation={true}
                followsUserLocation={false}
                showsMyLocationButton={false}
                showsCompass={false}
                toolbarEnabled={false}
                customMapStyle={mapStyle}
                onMapReady={setBoundaries}
                // @ts-ignore: minZoomLevel is deprecated for Apple Maps but required for Google Maps
                minZoomLevel={18}
                mapPadding={{
                    top: 0,
                    right: 0,
                    bottom: height * 0.05,
                    left: spacing.m,
                }}
            >
                {venues?.map((venue) => (
                    <Marker
                        key={venue.id}
                        coordinate={{
                            latitude: venue.map_latitude,
                            longitude: venue.map_longitude,
                        }}
                        onPress={() => onVenueSelect(venue.id)}
                        pinColor={theme.textSecondary}
                    >
                        <Callout tooltip>
                            <View style={styles.calloutContainer}>
                                <ThemedText type="label">
                                    {venue.name}
                                </ThemedText>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View >
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
        minWidth: spacing.xxxxl,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xs,
    },
});