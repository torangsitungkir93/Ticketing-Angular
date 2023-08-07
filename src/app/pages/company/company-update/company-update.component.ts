import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CompanyDataResDto } from "src/app/dto/company/company-data.res.dto";
import { CompanyService } from "src/app/services/company.service";

@Component({
    selector : 'company-update',
    templateUrl : './company-update.component.html'
})
export class CompanyUpdateComponent{
    companyDataResDto? : CompanyDataResDto;
    idParam! : number;
    companyUpdateReqDto = this.fb.group({
        companyId: [0],
        code: ['', [Validators.required]],
        name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        files: [''],
        ext: ['']
    })
    constructor (
        private companyService : CompanyService,
        private activatedRoute : ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private router : Router
    ){}

    init(){
        this.companyService.getById(this.idParam).subscribe(result=>{
            this.companyDataResDto = result;
            this.companyUpdateReqDto.setValue({
                companyId: this.companyDataResDto.id,
                code: this.companyDataResDto.companyCode,
                name: this.companyDataResDto.companyName,
                address: this.companyDataResDto.companyAddress,
                files: this.companyDataResDto.files,
                ext: this.companyDataResDto.ext
              });
        })
    }

    submit(): void {
        this.companyUpdateReqDto.value.companyId = this.companyDataResDto!.id;
        this.companyUpdateReqDto.value.code = this.companyDataResDto!.companyCode;
        const data = this.companyUpdateReqDto.getRawValue();
            this.companyService.update(data,true).subscribe(result => {
                this.router.navigateByUrl(`companies`);
            })
    }

    ngOnInit():void{
        this.activatedRoute.params.subscribe(id => {
            this.idParam = Number(Object.values(id));
        })
        this.init();
    }

    fileUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
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
            this.companyUpdateReqDto.patchValue({
              ext:resultExtension,files:resultBase64
            })
          })
        }
      }
}