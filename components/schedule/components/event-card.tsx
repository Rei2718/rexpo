import { FALLBACK_IMAGE_URL } from '@/constants/assets';
import { spacing } from '@/constants/theme';
import { EventOverview } from '@/supabase/data/types';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../themed-text';
import { ThemedView } from '../../themed-view';

type EventCardProps = {
  item: EventOverview;
};

export function EventCard({ item }: EventCardProps) {
  return (
    <View>
      <Link
        href={{
          pathname: "/test-modal",
          params: { id: item.event_id },
        }}
        asChild
      >
        <Pressable style={styles.container}>
          <Image
            source={
              item.event_logo_url
                ? { uri: item.event_logo_url }
                : FALLBACK_IMAGE_URL
            }
            style={styles.image}
          />

          <View style={styles.textContainer}>
            <ThemedText type="label" numberOfLines={2}>
              {item.event_title}
            </ThemedText>
            <ThemedText type="body" colorName="textSecondary" numberOfLines={1}>
              {item.event_overview_description}
            </ThemedText>
          </View>
          <ThemedView
            colorName="backgroundSecondary"
            style={styles.detailButton}
          >
            <ThemedText type="body" colorName="accent">
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
    borderRadius: 18,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: spacing.m,
  },
  detailButton: {
    borderRadius: 999,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.xl,
    justifyContent: "center",
    alignItems: "center",
  },
});