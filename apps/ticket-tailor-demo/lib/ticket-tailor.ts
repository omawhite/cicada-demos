import type {
  TicketTailorEvent,
  TicketTailorEventsResponse,
} from '@/lib/types/ticket-tailor';

const TICKET_TAILOR_API_URL = 'https://api.tickettailor.com/v1/events';

export async function getEvents(): Promise<TicketTailorEvent[]> {
  const apiKey = process.env.TICKET_TAILOR_API_KEY;

  if (!apiKey) {
    throw new Error('TICKET_TAILOR_API_KEY is not configured');
  }

  const response = await fetch(TICKET_TAILOR_API_URL, {
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
