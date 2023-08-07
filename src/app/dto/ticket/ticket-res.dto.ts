import { TicketAttachDto } from "./ticket-attach.dto";

export interface TicketResDto {
    id: number;
    ticketCode: string;
    title: string;
    body: string;
    status: string;
    statusCode: string;
    priority: string;
    productName: string;
    customerName: string;
    attachments: TicketAttachDto[];
  }