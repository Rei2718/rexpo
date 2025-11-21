import { GetVenues } from '@/supabase/data/types';

export interface MapComponentProps {
    venues: GetVenues[] | null | undefined;
    onVenueSelect: (venueId: string) => void;
    selectedVenueId?: string;
}
