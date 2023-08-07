import {
  Injectable
} from "@angular/core";
import {
  BaseService
} from "./base.service";
import {
  AuthService
} from "./auth.service";
import {
  TicketDevReqDto
} from "../dto/ticket-dev/ticket-dev.req.dto";
import {
  Observable
} from "rxjs";
import {
  BASE_URL
} from "../constant/dto/api.constant";
import { StatusUpdateReqDto } from "../dto/ticket/status-update.req.dto";
import { UpdateResDto } from "../dto/update-res.dto";

@Injectable({
  providedIn: 'root'
})
export class AssignService {
  constructor(private base: BaseService,
    private authService: AuthService) {}

  private get userId(): number {
    const profile = this.authService.getProfile()
    if (profile && profile.id) {
      return profile.id
    }
    return 0
  }

  assignDev(data: TicketDevReqDto, withToken: boolean): Observable < TicketDevReqDto> {
    return this.base.post < TicketDevReqDto> (`${BASE_URL}ticketdevs`, data, withToken)
  }
  changeStatus(data: StatusUpdateReqDto, withToken: boolean): Observable < UpdateResDto> {
    return this.base.patch < UpdateResDto> (`${BASE_URL}tickets`, data, withToken)
  }

}