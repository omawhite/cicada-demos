import { notFound } from 'next/navigation';
import { EventDetail } from '@/components/event-detail';
import { getEvent } from '@/lib/ticket-tailor';

interface EventPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;

  try {
    const event = await getEvent(id);

    return (
      <main className="container mx-auto px-4 py-8">
        <EventDetail event={event} />
      </main>
    );
  } catch {
    notFound();
  }
}
