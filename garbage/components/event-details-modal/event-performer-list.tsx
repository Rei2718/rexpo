import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FALLBACK_IMAGE_URL } from '@/constants/assets';
import { spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { GetEventDetailsById } from '@/supabase/data/types';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { EventDetailSection } from './event-detail-section';

type Performer = {
  id: string;
  name: string;
  avatar_url?: string | null;
  position?: string | null;
};

type EventPerformerListProps = {
  performers: GetEventDetailsById['performers'];
};

export function EventPerformerList({ performers }: EventPerformerListProps) {
  const placeholderColor = useThemeColor('backgroundSecondary');

  if (!Array.isArray(performers) || performers.length === 0) {
    return null;
  }

  const performerList = performers as Performer[];

  return (
    <EventDetailSection title="出演者">
      <View style={styles.listContainer}>
        {performerList.map((performer) => (
          <ThemedView
            key={performer.id}
            colorName="backgroundSecondary"
            style={styles.performerRow}
          >
            <View style={styles.leftContainer}>
              <Image
                source={
                  performer.avatar_url
                    ? { uri: performer.avatar_url }
                    : FALLBACK_IMAGE_URL
                }
                style={[styles.avatar, { backgroundColor: placeholderColor }]}
                transition={300}
              />
              <View>
                <ThemedText type="body">{performer.name}</ThemedText>
                {performer.position && (
                  <ThemedText type="caption" colorName="textSecondary">
                    {performer.position}
                  </ThemedText>
                )}
              </View>
            </View>
            <ThemedView
              colorName="backgroundTertiary"
              style={styles.detailButton}
            >
              <ThemedText type="label" colorName="accent">
                詳細
              </ThemedText>
          </ThemedView>
          </ThemedView>
        ))}
      </View>
    </EventDetailSection>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    gap: spacing.m,
    paddingHorizontal: spacing.xl,
  },
  performerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: spacing.xs,
    borderRadius: spacing.xxl,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: spacing.xxl,
    height: spacing.xxl,
    borderRadius: spacing.xxl,
    marginRight: spacing.m,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: spacing.l,
  },
  detailButton: {
    borderRadius: 999,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.xl,
    margin: spacing.xs,
    justifyContent: "center",
    alignItems: "center",
  },
});