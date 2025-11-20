import { ThemedText } from '@/components_2/core/ThemedText';
import { ThemedView } from '@/components_2/core/ThemedView';
import { radii, spacing } from '@/constants/theme';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MENU_ITEMS, SPONSOR_LOGOS } from '@/constants/home-data';

export function HomeContent() {
    const { width } = useWindowDimensions();
    const scrollViewPadding = spacing.xl;
    const gridGap = spacing.s;
    const contentWidth = width - scrollViewPadding * 2;
    const sponsorLogoWidth = (contentWidth - gridGap) / 2;

    return (
        <ThemedView style={styles.container}>
            <ThemedView colorName="backgroundSecondary" style={styles.menuCard}>
                {MENU_ITEMS.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <ThemedView style={styles.menuItem}>
                            <ThemedText type="label" colorName="textPrimary">
                                {item.label}
                            </ThemedText>
                        </ThemedView>
                        {index < MENU_ITEMS.length - 1 && (
                            <ThemedView colorName="separator" style={styles.separator} />
                        )}
                    </React.Fragment>
                ))}
            </ThemedView>

            <ThemedView style={styles.sponsorSection}>
                <ThemedText type="h3" style={styles.sectionTitle}>
                    Sponsors
                </ThemedText>
                <View style={styles.sponsorGrid}>
                    {SPONSOR_LOGOS.map((logoUri, index) => (
                        <ThemedView
                            key={index}
                            colorName="backgroundSecondary"
                            style={[
                                styles.sponsorLogoContainer,
                                { width: sponsorLogoWidth },
                            ]}>
                            <Image
                                source={{ uri: logoUri }}
                                style={styles.sponsorLogo}
                                contentFit="contain"
                            />
                        </ThemedView>
                    ))}
                </View>
            </ThemedView>
            <SafeAreaView edges={['bottom']} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: spacing.xxl,
    },
    menuCard: {
        borderRadius: radii.l,
        overflow: 'hidden',
    },
    menuItem: {
        paddingVertical: spacing.m,
        paddingHorizontal: spacing.l,
        backgroundColor: 'transparent',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        marginLeft: spacing.l,
    },
    sponsorSection: {
        gap: spacing.l,
    },
    sectionTitle: {
        paddingHorizontal: spacing.xs,
    },
    sponsorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.s,
    },
    sponsorLogoContainer: {
        aspectRatio: 1.618,
        padding: spacing.m,
        borderRadius: radii.m,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sponsorLogo: {
        width: '100%',
        height: '100%',
    },
});
