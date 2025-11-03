import { supabase } from "@/supabase/supabase";
import { Tag } from "./types";

export async function getOverviewList(tag: Tag) {
    const { data, error } = await supabase
      .rpc("get_events_by_tag", {
        p_tag_name: tag
      })
    if (error) throw error;
    return data;
}