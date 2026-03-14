import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TicketTailorCheckoutButton } from '@/components/ticket-tailor-checkout-button';
import type { TicketTailorEvent } from '@/lib/types/ticket-tailor';

function formatEventDate(start: TicketTailorEvent['start']): string {
  const date = new Date(start.iso);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatEventTime(
  start: TicketTailorEvent['start'],
  end: TicketTailorEvent['end']
): string {
  const startDate = new Date(start.iso);
  const endDate = new Date(end.iso);

  const startTime = startDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const endTime = endDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${startTime} - ${endTime}`;
}

interface EventDetailProps {
  event: TicketTailorEvent;
}

export function EventDetail({ event }: EventDetailProps) {
  const venueName =
    event.venue?.name ?? (event.online_event ? 'Online Event' : undefined);

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to Events
      </Link>

      <Card>
        {event.images?.header && (
          <div className="relative h-64 w-full sm:h-80 lg:h-96">
            <Image
              src={event.images.header}
              alt={event.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <CardHeader>
          <div className="space-y-2">
            <CardTitle className="text-2xl sm:text-3xl">
              {event.name}
            </CardTitle>
            <CardDescription className="text-base">
              {formatEventDate(event.start)}
            </CardDescription>
            <CardDescription>
              {formatEventTime(event.start, event.end)}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {event.description && (
            <div className="space-y-2">
              <h3 className="font-semibold">About this event</h3>
              <div
                className="text-muted-foreground prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </div>
          )}

          {venueName && (
            <div className="space-y-2">
              <h3 className="font-semibold">Location</h3>
              <div className="text-muted-foreground">
                <p>{venueName}</p>
                {event.venue?.address_1 && <p>{event.venue.address_1}</p>}
                {event.venue?.address_2 && <p>{event.venue.address_2}</p>}
                {(event.venue?.city || event.venue?.postal_code) && (
                  <p>
                    {event.venue.city}
                    {event.venue.city && event.venue.postal_code && ', '}
                    {event.venue.postal_code}
                  </p>
                )}
                {event.venue?.country && <p>{event.venue.country}</p>}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-muted-foreground text-sm">
              {event.tickets_available !== undefined && (
                <span>
                  {event.tickets_available ? 'Tickets available' : 'Sold out'}
                </span>
              )}
            </div>
            <TicketTailorCheckoutButton
              eventUrl={event.url}
              occurrenceId={event.id}
              className="bg-primary text-primary-foreground hover:bg-primary/80 inline-flex h-10 cursor-pointer items-center justify-center rounded-4xl px-6 text-sm font-medium transition-all"
            >
              Get Tickets
            </TicketTailorCheckoutButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
