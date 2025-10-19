import { supabase } from "@/supabase/supabase";
import { EventCategory, EventId } from "./types";

export async function getViewEventList(category: EventCategory) {
    const { data, error } = await supabase
      .rpc('get_event_list_by_category', {
        p_category: category
      })
    if (error) throw error;
    return data;
}

export async function getViewEventDetails(id: EventId) {
    const { data, error } = await supabase
      .rpc('get_event_details', {
        p_event_id: id
      })
    if (error) throw error;
    return data;
}