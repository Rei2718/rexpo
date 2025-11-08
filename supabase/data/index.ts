import { useQuery } from "@tanstack/react-query";
import { getEventDetailsById, getEventsListByTag } from "./function";
import { keys } from "./keys";
import { Tag } from "./types";

export function useGetEventsListByTag(tag: Tag) {
  const { data, isPending, isError} = useQuery({
    queryKey: keys.getEventsListByTag(tag),
    queryFn: () => getEventsListByTag(tag),
    enabled: !!tag,
  });
  return{ data, isPending, isError };
}

export function useGetEventDetailsById(id: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: keys.getEventDetailsById(id),
    queryFn: () => getEventDetailsById(id),
    enabled: !!id,
  });
  return { data, isPending, isError };
}