import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TicketResDto } from "src/app/dto/ticket/ticket-res.dto";
import { AssignService } from "src/app/services/assign.service";
import { AuthService } from "src/app/services/auth.service";
import { TicketService } from "src/app/services/ticket.service";

@Component({
    selector : 'ticket-list-developer',
    templateUrl : './ticket-list-developer.component.html'
})
export class TicketListDeveloperComponent{
    tickets! : TicketResDto[];
    ticketDetail! : TicketResDto;
    roleCode! : string;
    ticketId! : number;
    changeStatusByDevDto = this.fb.group({
        roleCode : ['', [Validators.required]],
        statusCode : ['', [Validators.required]],
        ticketId : [0, [Validators.required]],
    })

    constructor (private ticketService : TicketService,
        authService : AuthService,
        private fb: NonNullableFormBuilder,
        private router : Router,
        private activatedRoute : ActivatedRoute,
        private assignService : AssignService,
        ){

    }


    
    ngOnInit() : void{
        this.getTicketByDev();
    }

    getTicketByDev(){
        this.ticketService.getDevTickets().subscribe(result => {
            this.tickets= result;
        })
    }

    init(){
        this.ticketService.getTicketById(this.ticketId).subscribe(result => {
            this.ticketDetail = result;
        })
    }
}