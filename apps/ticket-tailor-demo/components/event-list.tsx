import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { TicketTailorEvent } from '@/lib/types/ticket-tailor';
import { cn } from '@/lib/utils';

function formatEventDate(start: TicketTailorEvent['start']): string {
  const date = new Date(start.iso);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatEventTime(start: TicketTailorEvent['start']): string {
  const date = new Date(start.iso);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

interface EventCardProps {
  event: TicketTailorEvent;
}

function EventCard({ event }: EventCardProps) {
  const venueName =
    event.venue?.name ?? (event.online_event ? 'Online Event' : undefined);

  return (
    <Card className="flex h-full flex-col">
      {event.images?.header && (
        <div className="relative w-full max-h-48">
          <Image
            src={event.images.header}
            alt={event.name}
            width={400}
            height={200}
            // className="h-48 w-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">{event.name}</CardTitle>
        <CardDescription>
          {formatEventDate(event.start)} at {formatEventTime(event.start)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {event.description && (
          <div
            className="text-muted-foreground line-clamp-3 text-sm"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        )}
        {venueName && (
          <p className="text-muted-foreground mt-2 text-sm">
            <span className="font-medium">Location:</span> {venueName}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Link
          href={`/events/${event.id}`}
          className="bg-primary text-primary-foreground hover:bg-primary/80 inline-flex h-9 w-full items-center justify-center rounded-4xl px-3 text-sm font-medium transition-all"
        >
          View Event
        </Link>
      </CardFooter>
    </Card>
  );
}

interface EventListProps {
  events: TicketTailorEvent[];
  className?: string;
}

export function EventList({ events, className }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className={cn('flex items-center justify-center py-12', className)}>
        <div className="text-muted-foreground">No events found</div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Events</h2>
        <span className="text-muted-foreground text-sm">
          {events.length} event{events.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
