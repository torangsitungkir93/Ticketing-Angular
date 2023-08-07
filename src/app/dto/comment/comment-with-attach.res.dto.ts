import { CommentAttachDto } from "./comment-attach.dto";

export interface CommentWithAttachResDto {
    commentId: number;
    userId: number;
    fullName: string;
    photo: number;
    roleName: string;
    createdAt: string;
    ticketId: number;
    message: string;
    attachments: CommentAttachDto[];
  }