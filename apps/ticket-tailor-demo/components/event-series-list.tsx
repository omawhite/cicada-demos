import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { TicketTailorEventSeries } from '@/lib/types/ticket-tailor';
import { cn } from '@/lib/utils';

interface EventSeriesCardProps {
  series: TicketTailorEventSeries;
}

function EventSeriesCard({ series }: EventSeriesCardProps) {
  const venueName =
    series.venue?.name ?? (series.online_event ? 'Online Event' : undefined);

  return (
    <Card className="flex h-full flex-col">
      {series.images?.header && (
        <div className="relative w-full max-h-48">
          <Image
            src={series.images.header}
            alt={series.name}
            width={400}
            height={200}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">{series.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {venueName && (
          <p className="text-muted-foreground mt-2 text-sm">
            <span className="font-medium">Location:</span> {venueName}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Link
          href={`/event-series/${series.id}`}
          className="bg-primary text-primary-foreground hover:bg-primary/80 inline-flex h-9 w-full items-center justify-center rounded-4xl px-3 text-sm font-medium transition-all"
        >
          View Series
        </Link>
      </CardFooter>
    </Card>
  );
}

interface EventSeriesListProps {
  eventSeries: TicketTailorEventSeries[];
  className?: string;
}

export function EventSeriesList({
  eventSeries,
  className,
}: EventSeriesListProps) {
  if (eventSeries.length === 0) {
    return (
      <div className={cn('flex items-center justify-center py-12', className)}>
        <div className="text-muted-foreground">No Screenings found</div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Screenings</h2>
        <span className="text-muted-foreground text-sm">
          {eventSeries.length} screenings
        </span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {eventSeries.map(series => (
          <EventSeriesCard key={series.id} series={series} />
        ))}
      </div>
    </div>
  );
}
