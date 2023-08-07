import { FileDataDto } from "../file/file-data.dto";

export interface CommentInsertReqDto {
    userId: number;
    ticketId: number;
    message: string;
    fileList: FileDataDto[]|undefined;
  }