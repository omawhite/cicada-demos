import { EventSeriesDetail } from '@/components/event-series-detail';
import { getEventSeriesById } from '@/lib/ticket-tailor';

interface EventSeriesPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventSeriesPage({
  params,
}: EventSeriesPageProps) {
  const { id } = await params;

  const series = await getEventSeriesById(id);

  console.log('Fetched event series from Ticket Tailor API:');
  console.log(series);

  return (
    <main className="container mx-auto px-4 py-8">
      <EventSeriesDetail series={series} />
    </main>
  );
}
