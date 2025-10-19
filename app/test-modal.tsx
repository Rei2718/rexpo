import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useViewEventDetails } from '@/supabase/data';
import { msArrowForwardIos, msBookmark } from '@material-symbols-react-native/rounded-200';
import { Image as ExpoImage } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { MsIcon } from 'material-symbols-react-native';
import { ScrollView, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const colorScheme = useColorScheme();
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
      <ScrollView>
        <SafeAreaView>
          <ThemedView style={{ flex: 1, padding: 36 }}>
            <View style={{ position: 'relative', width: '100%', aspectRatio: 1 }}>
              <ExpoImage
                source={data.cover_image_url ? { uri: data.cover_image_url } : require('@/assets/images/partial-react-logo.png')}
                style={{ width: '100%', aspectRatio: 1, borderRadius: 24 }}
              />
              <ThemedView
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MsIcon icon={msBookmark} color={Colors[colorScheme ?? 'light'].textPrimary} size={36} />
              </ThemedView>
              <ThemedView
                colorName="backgroundPrimary"
                style={{
                  position: 'absolute',
                  bottom: -15,
                  left: '50%',
                  transform: [{ translateX: -60 }],
                  width: 120,
                  height: 30,
                  borderRadius: 30,
                  padding: 3,
                }}
              >
                <ThemedView
                  colorName="backgroundSecondary"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 27,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ThemedText type="label" colorName="textPrimary">{data.event_type}</ThemedText>
                </ThemedView>
              </ThemedView>
            </View>
            <ThemedText type="ExtraLargeTitle" style={{ paddingTop: 36 }}>{data.title}</ThemedText>
              {sponsors && sponsors.length > 0 && (
                <View>
                  {sponsors.map((sponsor) => (
                    <View key={sponsor.id} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 12 }}>
                      <ThemedText type="label" colorName="textPrimary">Sponsored By</ThemedText>
                      {sponsor.logo_url && <ExpoImage source={{ uri: sponsor.logo_url }} style={{ width: 24, height: 24, borderRadius: 12, marginHorizontal: 12 }} contentFit='contain' />}
                      <ThemedText type="label" colorName="textPrimary">{sponsor.name}</ThemedText>
                    </View>
                  ))}
                </View>
              )}
              <ThemedText type="label" colorName="textPrimary" style={{ paddingTop: 48 }}>概要</ThemedText>
              <ThemedText type="default" colorName="textSecondary" style={{ paddingTop: 6 }}>{data.description}</ThemedText>

              <ThemedText type="label" colorName="textPrimary" style={{ paddingTop: 36 }}>出演者</ThemedText>
              {performers && performers.length > 0 && (
                <View style={{ paddingTop: 12, gap: 12 }}>
                  {performers.map((performer) => (
                    <ThemedView
                      key={performer.id}
                      colorName="backgroundSecondary"
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: "100%",
                        padding: 6,
                        borderRadius: 24,
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ExpoImage
                          source={{ uri: performer.avatar_url ?? undefined }}
                          style={{ width: 36, height: 36, borderRadius: 18, marginRight: 12 }}
                        />
                        <View>
                          <ThemedText type="default">{performer.name}</ThemedText>
                          {performer.role && (
                            <ThemedText type="default" colorName="textSecondary">
                              {performer.role}
                            </ThemedText>
                          )}
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 12 }}>
                        <ThemedText type="default" colorName="textPrimary" style={{ marginRight: 4 }}>
                          Check More
                        </ThemedText>
                        <MsIcon
                          icon={msArrowForwardIos}
                          color={Colors[colorScheme ?? 'light'].textPrimary}
                          size={12}
                        />
                      </View>
                    </ThemedView>
                  ))}
                </View>
              )}

              <ThemedText type="label" colorName="textPrimary" style={{ paddingTop: 36 }}>会場</ThemedText>
              {venue && (
                <ThemedText type="default" style={{ paddingTop: 12 }}>{venue.name} (収容人数: {venue.capacity ?? 'N/A'})</ThemedText>
              )}

              <ThemedText type="label" colorName="textPrimary" style={{ paddingTop: 36 }}>時間</ThemedText> 
              {timeSlots && timeSlots.length > 0 && (
                <View>
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

          </ThemedView>
        </SafeAreaView>
      </ScrollView>
    )
  };

  return <ThemedText>イベントが見つかりません。</ThemedText>;
}