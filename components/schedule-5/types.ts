export type TimeSlot = {
  id: string;
  start_datetime: string;
  end_datetime: string;
};

export type Performer = {
  id: string;
  name: string;
  avatar_url: string | null;
  role: string | null;
};

export type EventCardData = {
  event_id: string;
  title: string;
  description: string;
  cover_image_url: string |  null;
  time_slots: TimeSlot[] | null;
  performers: Performer[] | null;
};