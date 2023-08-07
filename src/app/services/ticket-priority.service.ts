import {
  Injectable
} from "@angular/core";
import {
  BaseService
} from "./base.service";
import {
  TicketPriorityResDto
} from "../dto/priority/ticket-priority.res.dto";
import {
  Observable
} from "rxjs";
import {
  BASE_URL
} from "../constant/dto/api.constant";

@Injectable({
  providedIn: 'root'
})
export class TicketPriorityService {
  constructor(private base: BaseService) {

  }

  getAllPriority(withToken: boolean): Observable < TicketPriorityResDto[] > {
    return this.base.get < TicketPriorityResDto[] > (`${BASE_URL}ticketpriorities`, withToken)
  }

}