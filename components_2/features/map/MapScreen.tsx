import { ThemedView } from '@/components_2/core/ThemedView';
import { spacing } from '@/constants/theme';
import { GetVenues } from '@/supabase/data/types';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VenueEventList } from './VenueEventList';
import { VenueList } from './VenueList';

export function MapScreen() {
    const [selectedVenue, setSelectedVenue] = useState<GetVenues | null>(null);

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <VenueList
                        onVenueSelect={setSelectedVenue}
                        selectedVenueId={selectedVenue?.id}
                    />
                </View>
                {selectedVenue && (
                    <VenueEventList venueId={selectedVenue.id} />
                )}
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        paddingBottom: spacing.m,
    },
});
