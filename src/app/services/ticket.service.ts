import {
  Injectable
} from "@angular/core";
import {
  BaseService
} from "./base.service";
import {
  Observable
} from "rxjs";
import {
  TicketResDto
} from "../dto/ticket/ticket-res.dto";
import {
  AuthService
} from "./auth.service";
import { TicketInsertReqDto } from "../dto/ticket/ticket-insert.req.dto";
import { BASE_URL } from "../constant/dto/api.constant";
import { CommentInsertReqDto } from "../dto/comment/comment-insert.req.dto";
import { TicketAttachDto } from "../dto/ticket/ticket-attach.dto";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private base: BaseService,
    private authService: AuthService) {}

  private get userId(): number {
    const profile = this.authService.getProfile()
    if (profile && profile.id) {
      return profile.id
    }
    return 0
  }
  getTickets(): Observable < TicketResDto[] > {
    return this.base.get < TicketResDto[] > (`http://localhost:8080/tickets/search?idCust=${this.userId}`, true);
  }
  getAttachmentTicket(id:number): Observable < TicketAttachDto[] > {
    return this.base.get < TicketAttachDto[] > (`http://localhost:8080/tickets/attach?id=${id}`, true);
  }
  getTicketById(id:number) : Observable < TicketResDto > {
    return this.base.get < TicketResDto > (`http://localhost:8080/tickets/detail?id=${id}`, true);
  }
  getPicTickets(): Observable < TicketResDto[] > {
    return this.base.get < TicketResDto[] > (`http://localhost:8080/tickets/search?idPic=${this.userId}&&statusCode=OPEN&&statusCode2=ROPN`, true);
  }
  getDevTickets(): Observable < TicketResDto[] > {
    return this.base.get < TicketResDto[] > (`http://localhost:8080/tickets/search?idDev=${this.userId}&statusCode=PEAG&statusCode2=ONPR`, true);
  }
  insert( data:TicketInsertReqDto, withToken : boolean):Observable<TicketInsertReqDto>{
    return this.base.post<TicketInsertReqDto>(`${BASE_URL}tickets`,data,withToken)
  }

  insertComment( data:CommentInsertReqDto, withToken : boolean):Observable<CommentInsertReqDto>{
    return this.base.post<CommentInsertReqDto>(`${BASE_URL}comments`,data,withToken)
  }

}