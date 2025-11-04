import { ThemedView } from '@/components/themed-view';
import { spacing } from '@/constants/theme';
import { EventOverview } from '@/supabase/data/types';
import { Fragment } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { EventCard } from './event-card';

type EventColumnProps = {
  items: EventOverview[];
};

export function EventColumn({ items }: EventColumnProps) {
  const { width } = useWindowDimensions();

  return (
    <View style={[{ width: width * 0.85 }, styles.container]}>
      {items.map((item, index) => (
        <Fragment key={item.event_id}>
          <EventCard item={item} />
          {index < items.length - 1 && (
            <ThemedView colorName="separator" style={styles.separator} />
          )}
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.s,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
});