import { HomeContent } from '@/components/home/home-content';
import ParallaxScrollImageView from '@/components/parallax-scroll-image-view';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ParallaxScrollImageView
      headerImage={
        <Image
          source={"https://picsum.photos/seed/dht444ggh/1080/1080"}
          style={styles.reactLogo}
          contentFit="cover"
        />
      }>
      <HomeContent />
    </ParallaxScrollImageView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: '100%',
    width: '100%',
  },
});

