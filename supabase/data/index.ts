import { useQuery } from "@tanstack/react-query";
import { getViewEventDetails, getViewEventList } from "./function";
import { keys } from "./keys";
import { EventCategory, EventId } from "./types";

export function useViewEventList(category: EventCategory) {
  const { data, isPending, isError} = useQuery({
    queryKey: keys.getViewEventList(category),
    queryFn: () => getViewEventList(category),
  });
  return{ data, isPending, isError };
}

export function useViewEventDetails(id: EventId) {
  const { data, isPending, isError} = useQuery({
    queryKey: keys.getViewEventDetails(id),
    queryFn: () => getViewEventDetails(id),
    enabled: !!id,
  });
  return{ data, isPending, isError };
}