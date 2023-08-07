import {
  Component
} from "@angular/core";
import {
  NonNullableFormBuilder,
  Validators
} from "@angular/forms";
import {
  ActivatedRoute,
  Router
} from "@angular/router";
import {
  RoleCode
} from "src/app/constant/role.code";
import {
  StatusCode
} from "src/app/constant/status.code";
import {
  TicketResDto
} from "src/app/dto/ticket/ticket-res.dto";
import {
  AssignService
} from "src/app/services/assign.service";
import {
  AuthService
} from "src/app/services/auth.service";
import {
  TicketService
} from "src/app/services/ticket.service";

@Component({
  selector: 'ticket-list',
  templateUrl: './ticket-list.component.html'
})

export class TicketListComponent {
  tickets!: TicketResDto[];
  ticketDetail!: TicketResDto;
  roleCode!: string;
  priorityCode! : string;
  idTicket!: number;
  visible: boolean = false;
  changeStatusReqDto = this.fb.group({
    roleCode: ['', [Validators.required]],
    statusCode: ['', [Validators.required]],
    ticketId: [0, [Validators.required]],
  })

  constructor(
    private ticketService: TicketService,
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private assignService: AssignService
  ) {}
  ngOnInit(): void {
    const profile = this.authService.getProfile();
    if (profile) {
      this.roleCode = profile.roleCode
    }
    this.getTicket();
  }

  getTicket() {
    if (this.isCustomer) {
      this.ticketService.getTickets().subscribe(result => {
        this.tickets = result;
      })
    } else if (this.isDeveloper) {
      this.ticketService.getDevTickets().subscribe(result => {
        this.tickets = result;
      })
    }

  }

  detail(param: number) {
    this.visible = true;
    this.idTicket = param;
    this.ticketService.getTicketById(this.idTicket).subscribe(result => {
      this.ticketDetail = result;
      this.roleCode = this.authService.getRoleCode();
      this.changeStatusReqDto.setValue({
        ticketId: this.ticketDetail.id,
        roleCode: this.roleCode,
        statusCode: this.ticketDetail.statusCode
      });
    })
  }

  statusColor(statusCode: string): string {
    if (statusCode === StatusCode.OPEN || statusCode === StatusCode.REOPEN){
        return "success";
    }else if (statusCode === StatusCode.PENDINGAGENT || statusCode===StatusCode.PENDINGCUST){
        return "warning";
    }else if (statusCode === StatusCode.ONPROGGRESS){
        return "primary"
    }else{
        return "danger"
    }
}

changeStatus() {
  const data = this.changeStatusReqDto.getRawValue();
  this.visible = false;
  this.assignService.changeStatus(data, true).subscribe(result => {})
}


get isCustomer() {
  return this.roleCode == RoleCode.CUST
}

get isDeveloper() {
  return this.roleCode == RoleCode.DEVELOPER
}
}