import {
  ChangeDetectorRef,
  Component
} from "@angular/core";
import {
  FormArray,
  NonNullableFormBuilder,
  Validators
} from "@angular/forms";
import {
  Router
} from "@angular/router";
import {
  TicketPriorityResDto
} from "src/app/dto/priority/ticket-priority.res.dto";
import {
  ProductCustResDto
} from "src/app/dto/product-customer/product-cust.res.dto";
import {
  TicketResDto
} from "src/app/dto/ticket/ticket-res.dto";
import {
  AuthService
} from "src/app/services/auth.service";
import {
  SubscribedService
} from "src/app/services/subscribed.service";
import {
  TicketPriorityService
} from "src/app/services/ticket-priority.service";
import {
  TicketService
} from "src/app/services/ticket.service";
import {
  FileDataDto
} from "src/app/dto/file/file-data.dto";

@Component({
  selector: 'ticket-insert',
  templateUrl: './ticket-insert.component.html'
})
export class TicketInsertComponent {
  tickets!: TicketResDto[];
  subscribedProduct!: ProductCustResDto[];
  priority!: TicketPriorityResDto[];
  fullName: string = this.userName;
  fileDataDto!: FileDataDto;

  ticketInsertReqDto = this.fb.group({
    userId: [0, [Validators.required]],
    priorityId: [0, [Validators.required]],
    productId: [0, [Validators.required]],
    ticketTitle: ['', [Validators.required]],
    ticketBody: ['', [Validators.required]],
    fileList: this.fb.array([this.fileDataDto])
  });

  constructor(
    private ticketService: TicketService,
    private priorityService: TicketPriorityService,
    private subscribedService: SubscribedService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService,
    private cd:ChangeDetectorRef
  ) {}

  private get userId(): number {
    const profile = this.authService.getProfile()
    if (profile && profile.id) {
      return profile.id
    }
    return 0
  }

  private get userName(): string {
    const profile = this.authService.getProfile()
    if (profile && profile.fullName) {
      return profile.fullName;
    }
    return '';
  }

  init() {
    this.ticketInsertReqDto.patchValue({
      userId: this.userId
    });
  }
  ngOnInit(): void {
    this.getSubscribedProduct();
    this.getPriority();
    this.init();
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
}

  getSubscribedProduct() {
    this.subscribedService.getAllSubscriberByIdCust(this.userId, true).subscribe(result => {
      this.subscribedProduct = result;
    })
  }

  getPriority() {
    this.priorityService.getAllPriority(true).subscribe(result => {
      this.priority = result;
    })
  }

  get files() {
    return this.ticketInsertReqDto.get('fileList') as FormArray;
  }

  insert() {
    const data = this.ticketInsertReqDto.getRawValue()
    if (this.ticketInsertReqDto.valid) {
      this.ticketService.insert(data, true).subscribe(result => {
        this.router.navigateByUrl('tickets')
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