/**
 * Ticket Tailor API Types
 * @see https://developers.tickettailor.com/docs/api/get-all-events
 */

export interface TicketTailorImage {
  url: string;
  width?: number;
  height?: number;
}

export interface TicketTailorVenue {
  name: string;
  postal_code?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  country?: string;
}

export interface TicketTailorEvent {
  id: string;
  name: string;
  description?: string;
  start: {
    date: string;
    time: string;
    tz: string;
    iso: string;
  };
  end: {
    date: string;
    time: string;
    tz: string;
    iso: string;
  };
  url: string;
  currency: string;
  status: 'published' | 'draft' | 'on_sale' | 'sales_ended' | 'sold_out';
  images?: {
    header?: string;
    thumbnail?: string;
  };
  venue?: TicketTailorVenue;
  online_event?: boolean;
  total_issued_tickets?: number;
  total_holds?: number;
  tickets_available?: boolean;
  private?: boolean;
  event_series_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TicketTailorEventsResponse {
  data: TicketTailorEvent[];
  links?: {
    next?: string;
    previous?: string;
  };
}

export interface TicketTailorError {
  status: number;
  error_code: string;
  message: string;
}
