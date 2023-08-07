import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit
} from "@angular/core";
import {
  NonNullableFormBuilder,
  Validators
} from "@angular/forms";
import {
  Router
} from "@angular/router";
import {
  RoleCode
} from "src/app/constant/role.code";
import {
  CompanyDataResDto
} from "src/app/dto/company/company-data.res.dto";
import {
  RoleResDto
} from "src/app/dto/role/role-res.dto";
import {
  CompanyService
} from "src/app/services/company.service";
import {
  RoleService
} from "src/app/services/role.service";
import {
  UserService
} from "src/app/services/user.service";

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html'
})
export class UserCreateComponent implements OnInit,AfterViewChecked{
  companies!: CompanyDataResDto[];
  roles!: RoleResDto[];
  loading = false;

  userInsertReqDto = this.fb.group({
    userEmail: ['', [Validators.email]],
    roleId: [0, [Validators.required]],
    companyId: [0, [Validators.required]],
    userName: ['', [Validators.required]],
    userPhone: ['', [Validators.required]],
    userAddress: ['', [Validators.required]],
    ext: [''],
    file: ['']
  });
  constructor(
    private companyService: CompanyService,
    private roleService: RoleService,
    private fb: NonNullableFormBuilder,
    private userService: UserService,
    private router: Router,
    private cd:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCompany();
    this.getRoles();
  }
  ngAfterViewChecked(): void {
      this.cd.detectChanges();
  }

  getCompany() {
    this.companyService.getCompanies(true).subscribe(result => {
      this.companies = result;
    })
  }

  getRoles() {
    this.roleService.getRoles(true).subscribe(result => {
      this.roles = result;
    })
  }

  insert() {
    const data = this.userInsertReqDto.getRawValue();
    this.loading=true;
    if (this.userInsertReqDto.valid) {
      this.userService.insert(data, true).subscribe({
        next:(result) => {
        this.loading=false;
        this.router.navigateByUrl('users');
        },
        error:()=>{
          this.loading=false;
        }
      })
    }
  }

  fileUpload(event: any) {
    const toBase64 = (file: File) => new Promise < string > ((resolve, reject) => {
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
        const resultExtension = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)
        this.userInsertReqDto.patchValue({
          ext: resultExtension,
          file: resultBase64
        })
      })
    }
  }

}