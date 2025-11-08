import { ThemedText } from '@/components/themed-text';
import { spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Image } from 'expo-image';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function GalleryCarouselItem({ imageUrl }: { imageUrl: string }) {
  const placeholderColor = useThemeColor('backgroundSecondary');

  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { backgroundColor: placeholderColor }]}
        transition={300}
      />
    </View>
  );
}

export function EventGalleryCarousel({
  imageUrls,
}: {
  imageUrls: (string | null | undefined)[];
}) {
  const { width: windowWidth } = useWindowDimensions();
  const carouselWidth = windowWidth * 0.9;
  const carouselHeight = carouselWidth * (9 / 16);

  const validUrls = imageUrls
    .filter(Boolean)
    .map((url) => ({ id: url as string }));

  if (validUrls.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <ThemedText type="h3" colorName="textSecondary" style={styles.title}>
        ギャラリー
      </ThemedText>
      <Carousel
        loop={true}
        width={carouselWidth}
        height={carouselHeight}
        autoPlay={false}
        data={validUrls}
        style={styles.carousel}
        renderItem={({ item }) => <GalleryCarouselItem imageUrl={item.id} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
  },
  title: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.m,
  },
  carousel: {
    width: '100%',
  },
  itemContainer: {
    flex: 1,
    borderRadius: spacing.l,
    marginLeft: spacing.xl,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});