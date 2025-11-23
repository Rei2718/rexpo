import { ThemedText } from "@/components_2/core/ThemedText";
import { ThemedView } from "@/components_2/core/ThemedView";
import { CAROUSEL_DATA, CarouselItem } from "@/constants/carousel-data";
import { radii, spacing, typography } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { LinearGradient } from "expo-linear-gradient";
import {
    ImageBackground,
    StyleSheet,
    View,
    useWindowDimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";


export default function CarouselContents() {
    const { width: windowWidth } = useWindowDimensions();
    const carouselWidth = windowWidth * 0.9;
    const carouselHeight = carouselWidth * (9 / 16);

    const backgroundPrimaryColor = useThemeColor("backgroundPrimary");

    const gradientColors = [
        "transparent",
        backgroundPrimaryColor + "99", // 60% alpha
        backgroundPrimaryColor + "F2", // 95% alpha
    ] as const;

    return (
        <View id="carousel-component">
            <Carousel
                loop={true}
                width={carouselWidth}
                height={carouselHeight}
                snapEnabled={true}
                pagingEnabled={true}
                autoPlayInterval={2000}
                data={CAROUSEL_DATA}
                style={styles.carousel}
                renderItem={({ item }: { item: CarouselItem }) => (
                    <ThemedView
                        colorName="backgroundPrimary"
                        style={styles.itemContainer}
                    >
                        <ImageBackground
                            source={{ uri: item.imageUrl }}
                            resizeMode="cover"
                            style={styles.imageBackground}
                        >
                            <LinearGradient
                                colors={gradientColors}
                                style={styles.textContainer}
                            >
                                <ThemedText
                                    type="caption"
                                    style={styles.categoryText}
                                    colorName="accent"
                                >
                                    {item.category}
                                </ThemedText>
                                <ThemedText
                                    type="h3"
                                    style={styles.titleText}
                                    colorName="textPrimary"
                                >
                                    {item.title}
                                </ThemedText>
                                <ThemedText
                                    type="body"
                                    style={styles.subtitleText}
                                    colorName="textSecondary"
                                >
                                    {item.subtitle}
                                </ThemedText>
                            </LinearGradient>
                        </ImageBackground>
                    </ThemedView>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    carousel: {
        width: "100%",
    },
    itemContainer: {
        flex: 1,
        borderRadius: radii.xl,
        marginLeft: spacing.xl,
        overflow: "hidden",
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
    },
    textContainer: {
        padding: spacing.xl,
    },
    categoryText: {
        textTransform: "uppercase",
    },
    titleText: {
        marginTop: spacing.xxs,
    },
    subtitleText: {
        fontWeight: typography.body.fontWeight,
        marginTop: spacing.xxs,
    },
});