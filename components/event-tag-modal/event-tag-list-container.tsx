import { ErrorComponent } from '@/components/ui/error-component';
import { LoadingComponent } from '@/components/ui/loading-component';
import { useGetEventsListByTag } from '@/supabase/data';
import { EventTagList } from './event-tag-list';

type EventTagListContainerProps = {
  targetTag: string;
};

export function EventTagListContainer({ targetTag }: EventTagListContainerProps) {
  const { data, isPending, isError } = useGetEventsListByTag(targetTag);

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <ErrorComponent />;
  }

  return <EventTagList data={data || []} tagName={targetTag} />;
}