import { FileDataDto } from "../file/file-data.dto";

export interface TicketInsertReqDto {
	userId : number;
	priorityId : number;
	productId : number;
	ticketTitle : string;
	ticketBody : string;
	fileList : FileDataDto[];
}