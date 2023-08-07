import { Component } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommentWithAttachResDto } from "src/app/dto/comment/comment-with-attach.res.dto";
import { TicketResDto } from "src/app/dto/ticket/ticket-res.dto";
import { CommentService } from "src/app/services/comment.service";
import { TicketService } from "src/app/services/ticket.service";
import { formatDate } from '@angular/common';

@Component({
    selector : 'ticket-detaildev',
    templateUrl : './ticket-detaildev.component.html'
})
export class TicketDetailDevComponent{
    ticketDataResDto!: TicketResDto;
    commentDataResDto! : CommentWithAttachResDto[];
    idParam! :number;
    constructor(
      private ticketService: TicketService,
      private commentService : CommentService,
      private fb: NonNullableFormBuilder,
      private router: Router,
      private activatedRoute : ActivatedRoute
      ) {}
  

    init(){
        this.activatedRoute.params.subscribe(id => {
            this.idParam = Number(Object.values(id));
        })
        this.ticketService.getTicketById(this.idParam).subscribe(result=>{
            this.ticketDataResDto = result;
        })
        this.commentService.getAllComments(this.idParam,true).subscribe(result=>{
            this.commentDataResDto = result;
        })
    }  
    ngOnInit(): void {
      this.init();
      
    }
    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return formatDate(date, 'dd MMM yyyy, HH:mm', 'en-US');
      }
}