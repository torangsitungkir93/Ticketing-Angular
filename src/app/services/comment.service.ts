import {
  Injectable
} from "@angular/core";
import {
  BaseService
} from "./base.service";
import {
  CommentWithAttachResDto
} from "../dto/comment/comment-with-attach.res.dto";
import {
  Observable
} from "rxjs";
import {
  BASE_URL
} from "../constant/dto/api.constant";
import {
  AuthService
} from "./auth.service";
import { CommentAttachReqDto } from "../dto/comment/comment-attach.req.dto";
import { CommentInsertReqDto } from "../dto/comment/comment-insert.req.dto";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private base: BaseService,
    private authService: AuthService) {}

  private get userId(): number {
    const profile = this.authService.getProfile()
    if (profile && profile.id) {
      return profile.id
    }
    return 0
  }

  getAllComments(ticketId:number,withToken: boolean): Observable < CommentWithAttachResDto[] > {
    return this.base.get < CommentWithAttachResDto[] > (`${BASE_URL}comments/ticket?q=${ticketId}`, withToken);
  }

  insert(data: CommentInsertReqDto, withToken: boolean): Observable < CommentInsertReqDto > {
    return this.base.post < CommentInsertReqDto > (`${BASE_URL}comments`, data, withToken)
  }
}