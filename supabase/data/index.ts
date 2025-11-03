import { useQuery } from "@tanstack/react-query";
import { getOverviewList } from "./function";
import { keys } from "./keys";
import { Tag } from "./types";

export function useGetOverviewList(tag: Tag) {
  const { data, isPending, isError} = useQuery({
    queryKey: keys.getOverviewList(tag),
    queryFn: () => getOverviewList(tag),
    enabled: !!tag,
  });
  return{ data, isPending, isError };
}