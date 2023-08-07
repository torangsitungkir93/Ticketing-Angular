import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { StatusCode } from "src/app/constant/status.code";
import { TicketResDto } from "src/app/dto/ticket/ticket-res.dto";
import { UserResDto } from "src/app/dto/user/user-res.dto";
import { AssignService } from "src/app/services/assign.service";
import { AuthService } from "src/app/services/auth.service";
import { TicketService } from "src/app/services/ticket.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector : 'ticket-list-pic',
    templateUrl : './ticket-list-pic.component.html'
})
export class TicketListPicComponent implements OnInit{
    tickets! : TicketResDto[];
    ticketDetail! : TicketResDto;
    developer! : UserResDto[];
    picId! : number;
    loading = false;
    idParam! : number;
    roleCode! : string;
    visible: boolean = false;
    assignDeveloperReqDto = this.fb.group({
        picId: [0],
        devId: [0,[Validators.required]],
        ticketId: [0, [Validators.required]],
        roleCode: ['', [Validators.required]],
        statusCode: ['']
    })

    constructor (
        private ticketService : TicketService,
        private authService : AuthService,
        private userService : UserService,
        private fb: NonNullableFormBuilder,
        private router : Router,
        private activatedRoute : ActivatedRoute,
        private assignService : AssignService){

    }

    detail(param:number){
        this.visible = true;
        this.idParam = param;
        this.ticketService.getTicketById(this.idParam).subscribe(result => {
            this.ticketDetail = result;
            this.picId  = this.authService.getUserId();
            this.roleCode  = this.authService.getRoleCode();
            this.assignDeveloperReqDto.patchValue({
                picId: this.picId,
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
    
    ngOnInit() : void{
        this.activatedRoute.params.subscribe(id => {
            this.idParam = Number(Object.values(id));
            this.getTicketByPic();
            this.getAllDeveloper();
        })
    }
    getAllDeveloper() {
        this.userService.getDeveloper(true).subscribe(result => {
            this.developer = result;
        })
    }

    getTicketByPic(){
        this.ticketService.getPicTickets().subscribe(result => {
            this.tickets= result;
        })
    }

    assignDeveloper(){
        this.loading=true;
        const data = this.assignDeveloperReqDto.getRawValue();
        this.assignService.assignDev(data,true) .subscribe(result => {
        })
    }
}