import { EventList } from '@/components/event-list';
import { getEvents } from '@/lib/ticket-tailor';

export default async function PreviousShowingsPage() {
  const events = await getEvents({ status: 'sales_closed' });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Previous Showings
          </h1>
          <p className="text-muted-foreground mt-2">
            Events that have already taken place.
          </p>
        </div>
        <EventList events={events} />
      </div>
    </main>
  );
}
