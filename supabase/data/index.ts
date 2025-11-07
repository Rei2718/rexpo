import { useQuery } from "@tanstack/react-query";
import { getEventsListByTag } from "./function";
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