import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useViewEventDetails } from '@/supabase/data';
import { Image as ExpoImage } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

type TimeSlot = {
  id: string;
  start_datetime: string;
  end_datetime: string;
};

type Performer = {
  id: string;
  name: string;
  avatar_url: string | null;
  role: string | null;
};

type Venue = {
  id: string;
  name: string;
  capacity: number | null;
};

type Sponsor = {
  id: string;
  name: string;
  logo_url: string | null;
  level: string | null;
};

export default function EventModalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError } = useViewEventDetails(id);

  if (isPending) {
    return <ThemedText>読み込み中</ThemedText>;
  }

  if (isError) {
    return <ThemedText>イベントの読み込みに失敗しました。</ThemedText>;
  }

  if (data) {
    const timeSlots = data.time_slots as TimeSlot[] | null;
    const performers = data.performers as Performer[] | null;
    const venue = data.venue as Venue | null;
    const sponsors = data.sponsors as Sponsor[] | null;

    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <ExpoImage
            source={data.cover_image_url ? { uri: data.cover_image_url } : require('@/assets/images/partial-react-logo.png')}
            style={{ height: '100%', width: '100%' }}
            contentFit="cover"
          />
        }
      >
        <ThemedView style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center", paddingBottom: 24 }}>
            <ThemedText type="ExtraLargeTitle">{data.title}</ThemedText>
            <ThemedText type="subtitle" colorName="textSecondary" style={{ marginTop: 4 }}>{data.event_type}</ThemedText>
          </View>

          {performers && performers.length > 0 && (
            <View>
              <ThemedText type="subtitle" colorName="textSecondary">出演者</ThemedText>
              {performers.map((performer) => (
                <View key={performer.id} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  <ExpoImage source={{ uri: performer.avatar_url ?? undefined }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }} />
                  <View>
                    <ThemedText type="default">{performer.name}</ThemedText>
                    {performer.role && (
                      <ThemedText type="default" colorName="textSecondary">{performer.role}</ThemedText>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}


          <ThemedText type="default" style={{ marginTop: 12 }}>{data.description}</ThemedText>

          {venue && (
            <View>
              <ThemedText type="subtitle">会場</ThemedText>
              <ThemedText type="default">{venue.name} (収容人数: {venue.capacity ?? 'N/A'})</ThemedText>
            </View>
          )}

          {timeSlots && timeSlots.length > 0 && (
            <View>
              <ThemedText type="subtitle">開催時間</ThemedText>
              {timeSlots.map((slot) => {
                const formatTime = (timeString: string) => {
                  if (!timeString) return '';
                  const parts = timeString.split(':');
                  return parts.length >= 2 ? `${parts[0]}:${parts[1]}` : timeString;
                };
                return (
                  <ThemedText key={slot.id} type="default">
                    {formatTime(slot.start_datetime)} - {formatTime(slot.end_datetime)}
                  </ThemedText>
                );
              })}
            </View>
          )}

          {sponsors && sponsors.length > 0 && (
            <View>
              <ThemedText type="subtitle">スポンサー</ThemedText>
              {sponsors.map((sponsor) => (
                 <View key={sponsor.id} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  {sponsor.logo_url && <ExpoImage source={{ uri: sponsor.logo_url }} style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12, backgroundColor: '#fff' }} contentFit='contain' />}
                  <View>
                    <ThemedText type="default">{sponsor.name}</ThemedText>
                    {sponsor.level && (
                      <ThemedText type="default" colorName="textSecondary">{sponsor.level}</ThemedText>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

        </ThemedView>
      </ParallaxScrollView>
    )
  };

  return <ThemedText>イベントが見つかりません。</ThemedText>;
}