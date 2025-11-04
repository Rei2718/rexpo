import { useChunkedData } from '@/hooks/use-chunked-data';
import { useGetOverviewList } from '@/supabase/data';
import { ErrorComponent } from '../ui/error-component';
import { LoadingComponent } from '../ui/loading-component';
import { EventTagListUI } from './event-tag-list-uI';

const CHUNK_SIZE = 3;

type EventTagListProps = {
  targetTag: string;
  title: string;
  subtitle: string;
};

export function EventTagListContainer({ targetTag, title, subtitle }: EventTagListProps) {
  const { data: originalData, isPending, isError } = useGetOverviewList(targetTag);
  const chunkedData = useChunkedData(originalData, CHUNK_SIZE);

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <EventTagListUI
      title={title}
      subtitle={subtitle}
      chunkedData={chunkedData}
    />
  );
}