import { ErrorComponent } from '@/components_2/core/ErrorComponent';
import { LoadingComponent } from '@/components_2/core/LoadingComponent';
import { ThemedText } from '@/components_2/core/ThemedText';
import { ThemedView } from '@/components_2/core/ThemedView';
import { BookmarkButton } from '@/components_2/features/bookmarks/BookmarkButton';
import {
  EventCoverImage,
  EventDescription,
  EventGalleryCarousel,
  EventHeader,
  EventPerformerList,
  EventTagSection,
  EventTimeList,
  EventVenueSection,
} from '@/components_2/features/event-details';
import { spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useGetEventDetailsById } from '@/supabase/data';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function EventDetailModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError } = useGetEventDetailsById(id);

  const headerBackgroundColor = useThemeColor('backgroundPrimary');
  const headerTextColor = useThemeColor('textPrimary');

  if (!id) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText>イベントIDが指定されていません。</ThemedText>
      </View>
    );
  }

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError || !data) {
    return <ErrorComponent />;
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: '',
          headerStyle: { backgroundColor: headerBackgroundColor },
          headerTintColor: headerTextColor,
          headerRight: () => <BookmarkButton id={id} type="event" />,
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={styles.scrollViewContent}>
          <View>
            <EventCoverImage coverImageUrl={data.cover_image_url} logoUrl={data.logo_url} />
            <EventHeader
              title={data.title}
              overview_description={data.overview_description}
              sponsorTier="プラチナブーススポンサー"
            />
          </View>
          <EventDescription
            description={data.description}
            overview={data.overview_description}
          />

          <View style={styles.tagCarouselContainer}>
            <EventTagSection tags={data.tags} />
            <EventGalleryCarousel
              imageUrls={[
                data.cover_image_url,
                data.gallery_image_url_1,
                data.gallery_image_url_2,
                data.gallery_image_url_3,
              ]}
            />
          </View>

          <EventPerformerList performers={data.performers} />
          <EventTimeList times={data.times} />
          <EventVenueSection venueName={data.venue_name} />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingVertical: spacing.xl,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    gap: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  tagCarouselContainer: {
    gap: spacing.l,
  },
});