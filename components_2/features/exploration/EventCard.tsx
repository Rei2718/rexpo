import { ThemedText } from '@/components_2/core/ThemedText';
import { ThemedView } from '@/components_2/core/ThemedView';
import { FALLBACK_IMAGE_URL } from '@/constants/assets';
import { radii, spacing } from '@/constants/theme';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { EventCardProps } from './types';

export function EventCard({ item }: EventCardProps) {
    return (
        <View>
            <Link
                href={{
                    pathname: "/event-detail-modal",
                    params: { id: item.id },
                }}
                asChild
            >
                <Pressable style={styles.container}>
                    <Image
                        source={item.logo_url ? item.logo_url : FALLBACK_IMAGE_URL}
                        style={styles.image}
                        transition={300}
                    />

                    <View style={styles.textContainer}>
                        <ThemedText type="h3" numberOfLines={2}>
                            {item.title}
                        </ThemedText>
                        <ThemedText type="caption" colorName="textSecondary" numberOfLines={1}>
                            {item.overview_description}
                        </ThemedText>
                    </View>
                    <ThemedView
                        colorName="backgroundSecondary"
                        style={styles.detailButton}
                    >
                        <ThemedText type="label" colorName="textPrimary">
                            詳細
                        </ThemedText>
                    </ThemedView>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: spacing.xxxl,
        height: spacing.xxxl,
        borderRadius: radii.l,
    },
    textContainer: {
        flex: 1,
        marginHorizontal: spacing.m,
    },
    detailButton: {
        borderRadius: radii.pill,
        paddingVertical: spacing.s,
        paddingHorizontal: spacing.xl,
        justifyContent: "center",
        alignItems: "center",
    },
});
