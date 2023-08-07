import {
  Component
} from "@angular/core";
import {
  FormArray,
  NonNullableFormBuilder,
  Validators
} from "@angular/forms";
import {
  ActivatedRoute,
  Router
} from "@angular/router";
import {
  CommentWithAttachResDto
} from "src/app/dto/comment/comment-with-attach.res.dto";
import {
  TicketResDto
} from "src/app/dto/ticket/ticket-res.dto";
import {
  CommentService
} from "src/app/services/comment.service";
import {
  TicketService
} from "src/app/services/ticket.service";
import {
  formatDate
} from '@angular/common';
import { AuthService } from "src/app/services/auth.service";
import { RoleCode } from "src/app/constant/role.code";
import { TicketAttachDto } from "src/app/dto/ticket/ticket-attach.dto";
import { FileDataDto } from "src/app/dto/file/file-data.dto";

@Component({
  selector: 'ticket-detail',
  templateUrl: './ticket-detail.component.html'
})
export class TicketDetailComponent {
  ticketDataResDto?: TicketResDto|undefined;
  commentDataResDto!: CommentWithAttachResDto[];
  attachDataResDto!: TicketAttachDto[];
  roleCode!: string;
  idTicket!: number;
  fileDataResDto:FileDataDto[]=[];

  commentReqDto = this.fb.group({
    userId: [0, [Validators.required]],
    ticketId: [0, [Validators.required]],
    message: ['', [Validators.required]],
    fileList : this.fb.array(this.fileDataResDto)
  });

  constructor(
    private ticketService: TicketService,
    private commentService: CommentService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService : AuthService
  ) {}

  private get userId(): number {
    const profile = this.authService.getProfile()
    if (profile && profile.id) {
      return profile.id
    }
    return 0
  }


  init() {
    this.activatedRoute.params.subscribe(id => {
      this.idTicket = Number(Object.values(id));
      this.commentReqDto.patchValue({
        ticketId: this.idTicket,
        userId: this.userId
      })
    });
    this.ticketService.getTicketById(this.idTicket).subscribe(result => {
      this.ticketDataResDto = result;
    })
    this.commentService.getAllComments(this.idTicket, true).subscribe(result => {
      this.commentDataResDto = result;
    })
    this.ticketService.getAttachmentTicket(this.idTicket).subscribe(result => {
      this.attachDataResDto = result;
    })
  }

  ngOnInit(): void {
    this.init();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return formatDate(date, 'dd MMM yyyy, HH:mm', 'en-US');
  }

  get isCustomer() {
    return this.roleCode == RoleCode.CUST
  }

  get isDeveloper() {
    return this.roleCode == RoleCode.DEVELOPER
  }

  get files() {
    return this.commentReqDto.get('fileList') as FormArray;
  }

  insertComment() {
    const data = this.commentReqDto.getRawValue();
    if (!data.fileList || data.fileList.length === 0) {
      this.files.clear();
    }
    if (this.commentReqDto.valid) {
      this.commentService.insert(data, true).subscribe(result => {
      })
    }
  }

  
  fileUpload(event: any) {
    this.files.clear()
    const toBase64 = (file: File) => new Promise <string> ((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
      };
      reader.onerror = error => reject(error);
    });

    for (let file of event.files) {
      toBase64(file).then(result => {
        const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
        const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)
        this.files.push(this.fb.control(
          {
            files: resultBase64,
            ext: resultExtension
          }
        ))
      })
    }
  }
}