import type {
  TicketTailorEvent,
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
    throw new Error('TICKET_TAILOR_API_KEY is not configured');
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
  console.dir('Ticket Tailor API Response Status:', response);

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.status}`);
  }

  const data: TicketTailorEventsResponse = await response.json();
  return data.data;
}
