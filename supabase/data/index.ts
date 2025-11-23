import { useQueries, useQuery } from "@tanstack/react-query";
import { useRefetchOnFocus } from "../../hooks/useRefetchOnFocus";
import { getEventDetailsById, getEventsByVenueId, getEventsListByTag, getVenues } from "./function";
import { keys } from "./keys";
import { Tag } from "./types";

export function useGetEventsListByTag(tag: Tag) {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: keys.getEventsListByTag(tag),
    queryFn: () => getEventsListByTag(tag),
    enabled: !!tag,
  });
  useRefetchOnFocus(refetch);
  return { data, isPending, isError };
}

export function useGetEventDetailsById(id: string) {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: keys.getEventDetailsById(id),
    queryFn: () => getEventDetailsById(id),
    enabled: !!id,
  });
  useRefetchOnFocus(refetch);
  return { data, isPending, isError };
}

export function useGetEventsByIds(ids: string[]) {
  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: keys.getEventDetailsById(id),
      queryFn: () => getEventDetailsById(id),
      enabled: !!id,
    })),
  });

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const data = queries.map((query) => query.data).filter((item) => item !== undefined);

  return { data, isLoading, isError };
}

export function useGetVenues() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: keys.getVenues(),
    queryFn: () => getVenues(),
  });
  useRefetchOnFocus(refetch);
  return { data, isPending, isError };
}

export function useGetEventsByVenue(id: string) {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: keys.getEventsByVenueId(id),
    queryFn: () => getEventsByVenueId(id),
    enabled: !!id,
  });
  useRefetchOnFocus(refetch);
  return { data, isPending, isError };
}