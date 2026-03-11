import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { TicketTailorEventSeries } from '@/lib/types/ticket-tailor';

interface EventSeriesDetailProps {
  series: TicketTailorEventSeries;
}

export function EventSeriesDetail({ series }: EventSeriesDetailProps) {
  const venueName =
    series.venue?.name ?? (series.online_event ? 'Online Event' : undefined);

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
        Back to Screenings
      </Link>

      <Card>
        {series.images?.header && (
          <div className="relative h-64 w-full sm:h-80 lg:h-96">
            <Image
              src={series.images.header}
              alt={series.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <CardHeader>
          <div className="space-y-2">
            <CardTitle className="text-2xl sm:text-3xl">
              {series.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {series.description && (
            <div className="space-y-2">
              <h3 className="font-semibold">About this event series</h3>
              <div
                className="text-muted-foreground prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: series.description }}
              />
            </div>
          )}

          {venueName && (
            <div className="space-y-2">
              <h3 className="font-semibold">Location</h3>
              <div className="text-muted-foreground">
                <p>{venueName}</p>
                {series.venue?.address_1 && <p>{series.venue.address_1}</p>}
                {series.venue?.address_2 && <p>{series.venue.address_2}</p>}
                {(series.venue?.city || series.venue?.postal_code) && (
                  <p>
                    {series.venue.city}
                    {series.venue.city && series.venue.postal_code && ', '}
                    {series.venue.postal_code}
                  </p>
                )}
                {series.venue?.country && <p>{series.venue.country}</p>}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={series.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground hover:bg-primary/80 inline-flex h-10 items-center justify-center rounded-4xl px-6 text-sm font-medium transition-all"
            >
              View on Ticket Tailor
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
