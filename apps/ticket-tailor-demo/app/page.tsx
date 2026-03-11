
import { EventSeriesList } from '@/components/event-series-list';
import { getEventSeries } from '@/lib/ticket-tailor';

export default async function Page() {
  const eventSeries = await getEventSeries({ status: 'published' });
  console.log('Fetched event series from Ticket Tailor API:');
  console.dir(eventSeries);

  return (
    <main className="container mx-auto px-4 py-8">
      <EventSeriesList eventSeries={eventSeries} />
    </main>
  );
}
