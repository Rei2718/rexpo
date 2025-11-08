import { ThemedText } from '@/components/themed-text';
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
  role?: string | null;
};

type EventPerformerListProps = {
  performers: GetEventDetailsById['performers'];
};

export function EventPerformerList({ performers }: EventPerformerListProps) {
  const performerList = performers as Performer[] | null;
  const placeholderColor = useThemeColor('backgroundSecondary');

  if (!performerList || performerList.length === 0) {
    return null;
  }

  return (
    <EventDetailSection title="出演者">
      {performerList.map((performer) => (
        <View key={performer.id} style={styles.performerRow}>
          <Image
            source={performer.avatar_url}
            style={[styles.avatar, { backgroundColor: placeholderColor }]}
            transition={300}
          />
          <View>
            <ThemedText type="body">{performer.name}</ThemedText>
            {performer.role && (
              <ThemedText type="body" colorName="textSecondary">
                {performer.role}
              </ThemedText>
            )}
          </View>
        </View>
      ))}
    </EventDetailSection>
  );
}

const styles = StyleSheet.create({
  performerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.m,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.m,
  },
});