export interface Sponsor {
  id: string;
  name: string;
  logo_url: string | null;
  level?: string | null;
}

export interface Performer {
  id: string;
  name: string;
  avatar_url: string | null;
  role: string | null;
}

export interface Venue {
  id: string;
  name: string;
  capacity: number | null;
}

export interface TimeSlot {
  id: string;
  start_datetime: string;
  end_datetime: string;
}