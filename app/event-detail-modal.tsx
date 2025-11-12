import {
  EventCoverImage,
  EventDescriptionSection,
  EventDetailHeader,
  EventGalleryCarousel,
  EventPerformerList,
  EventTagSection,
  EventTimeList,
  EventVenueSection,
} from '@/components/event-details-modal';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ErrorComponent } from '@/components/ui/error-component';
import { LoadingComponent } from '@/components/ui/loading-component';
import { spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useGetEventDetailsById } from '@/supabase/data';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

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
          headerTitle: data.title || '',
          headerStyle: { backgroundColor: headerBackgroundColor },
          headerTintColor: headerTextColor,
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
            <EventDetailHeader
              title={data.title}
              overview_description={data.overview_description}
              sponsorTier="プラチナブーススポンサー"
            />
          </View>
          <EventDescriptionSection
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