import { Dimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

const defaultDataWith6Colors = [
	"#B0604D",
	"#899F9C",
	"#B3C680",
	"#5C6265",
	"#F5D399",
	"#F1F1F1",
];

const width = Dimensions.get("window").width;

export default function EventCarousel() {
	return (
		<View
			id="carousel-component"
		>
			<Carousel
				loop={true}
				width={width * 0.9}
				height={width * 0.9 * 0.577}
				snapEnabled={true}
				pagingEnabled={true}
				autoPlayInterval={2000}
				data={defaultDataWith6Colors}
				style={{ width: "100%" }}
				onSnapToItem={(index) => console.log("current index:", index)}
				renderItem={({ index }) => (
          <ThemedView
          colorName="backgroundSecondary"
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
              borderRadius: 24,
              marginLeft: 24,
            }}
          >
            <ThemedText style={{ textAlign: "center", fontSize: 30 }}>{index}</ThemedText>
          </ThemedView>
        )}
			/>
		</View>
	);
}