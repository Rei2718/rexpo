import ParallaxImageScrollView from '@/components_2/core/ParallaxImageScrollView';
import { HomeContent } from '@/components_2/features/home/HomeContent';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
    return (
        <ParallaxImageScrollView
            headerImage={
                <Image
                    source={"https://picsum.photos/seed/dht444ggh/1080/1080"}
                    style={styles.reactLogo}
                    contentFit="cover"
                />
            }>
            <HomeContent />
        </ParallaxImageScrollView>
    );
}

const styles = StyleSheet.create({
    reactLogo: {
        height: '100%',
        width: '100%',
    },
});
