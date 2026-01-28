import type {
  TicketTailorEvent,
  TicketTailorEventResponse,
  TicketTailorEventsResponse,
} from '@/lib/types/ticket-tailor';

const TICKET_TAILOR_API_URL = 'https://api.tickettailor.com/v1/events';

export interface GetEventsParams {
  status?: TicketTailorEvent['status'];
  limit?: number;
  starting_after?: string;
  ending_before?: string;
}

export async function getEvents(
  params?: GetEventsParams
): Promise<TicketTailorEvent[]> {
  const apiKey = process.env.TICKET_TAILOR_API_KEY;

  if (!apiKey) {
    // throw new Error('TICKET_TAILOR_API_KEY is not configured');
    console.error('TICKET_TAILOR_API_KEY is not configured');
    return [];
  }

  const url = new URL(TICKET_TAILOR_API_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.status}`);
  }

  const data: TicketTailorEventsResponse = await response.json();
  return data.data;
}

export async function getEvent(eventId: string): Promise<TicketTailorEvent> {
  const apiKey = process.env.TICKET_TAILOR_API_KEY;

  if (!apiKey) {
    throw new Error('TICKET_TAILOR_API_KEY is not configured');
  }

  if (!eventId) {
    throw new Error('Event ID is required');
  }

  const url = `${TICKET_TAILOR_API_URL}/${eventId}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch event ${eventId}: ${response.status}`);
  }

  //TODO: need to fix this typing
  const data: TicketTailorEventResponse = await response.json();
  //@ts-expect-error gotta fix typing
  return data;
}
