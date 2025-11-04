import { useThemeColor } from "@/hooks/use-theme-color";
import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { spacing, typography } from "../../constants/theme";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

const carouselData = [
  {
    id: 1,
    category: "NEW",
    title: "iPhone 17 Pro",
    subtitle: "Pro. Beyond.",
    imageUrl: "https://picsum.photos/seed/dhtydyjgh/1080/1920",
  },
  {
    id: 2,
    category: "APPLE VISION PRO",
    title: "Welcome to the era of spatial computing.",
    subtitle: "Learn more.",
    imageUrl: "https://picsum.photos/seed/dhtsdddfgh/1080/1920",
  },
  {
    id: 3,
    category: "MACBOOK AIR",
    title: "Supercharged by M4.",
    subtitle: "Impressively big. Impossibly thin.",
    imageUrl: "https://picsum.photos/seed/dht18gh/1080/1920",
  },
  {
    id: 4,
    category: "WATCH",
    title: "Series 11",
    subtitle: "Smarter. Brighter. Mightier.",
    imageUrl: "https://picsum.photos/seed/dhtvukv6h/1080/1920",
  },
];

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
        data={carouselData}
        style={styles.carousel}
        renderItem={({ item }) => (
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
    borderRadius: spacing.xl,
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