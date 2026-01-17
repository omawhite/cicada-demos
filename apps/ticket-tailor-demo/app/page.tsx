import { EventList } from '@/components/event-list';
import { getEvents } from '@/lib/ticket-tailor';

export default async function Page() {
  const events = await getEvents({ status: 'published' });

  return (
    <main className="container mx-auto px-4 py-8">
      <EventList events={events} />
    </main>
  );
}
