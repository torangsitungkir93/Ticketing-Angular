import {FileDataDto} from '../file/file-data.dto'

export interface TicketDevReqDto {
	 picId : number;
	 devId : number|null;
	 ticketId : number;
	 roleCode : string;
	 statusCode : string;
}