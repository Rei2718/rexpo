import { Colors, spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { EventCoverImageProps } from './types';

export function EventCoverImage({ coverImageUrl, logoUrl }: EventCoverImageProps) {
    const placeholderColor = useThemeColor('backgroundSecondary');

    if (!coverImageUrl) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: coverImageUrl }}
                style={[
                    styles.image,
                    { backgroundColor: placeholderColor },
                ]}
                transition={300}
            />
            {logoUrl && (
                <View style={styles.logoFrame}>
                    <Image
                        source={{ uri: logoUrl }}
                        style={styles.logo}
                        transition={300}
                        contentFit="cover"
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.xl,
        alignItems: 'center',
        position: 'relative',
        marginBottom: spacing.xxl,
    },
    image: {
        width: '100%',
        maxWidth: 500,
        aspectRatio: 1,
        borderRadius: spacing.l,
    },
    logoFrame: {
        position: 'absolute',
        bottom: -spacing.xxl,
        backgroundColor: Colors.light.textPrimary,
        borderRadius: spacing.xl + spacing.xs,
        padding: spacing.xs,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    logo: {
        width: spacing.xxxxl,
        height: spacing.xxxxl,
        borderRadius: spacing.xl,
    },
});
