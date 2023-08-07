import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { CompanyService } from "../../../services/company.service";
import { Router } from "@angular/router";

@Component({
    selector : 'company-insert',
    templateUrl : './company-insert.component.html'
})
export class CompanyInsertComponent{
  
    companyInsertReqDto = this.fb.group({
        companyName: ['',[Validators.required]],
        companyAddress: ['',[Validators.required]],
        companyCode: ['',[Validators.required]],
        file: [''],
        ext: [''],
    })

    constructor (
        private companyService:CompanyService,
        private fb: NonNullableFormBuilder,
        private router : Router
    ){
        
    }

    ngOnInit(){

    }
    insert() {
        const data = this.companyInsertReqDto.getRawValue();
        if (this.companyInsertReqDto.valid) {
          this.companyService.insert(data, true).subscribe(result => {
            this.router.navigateByUrl('companies');
          })
        }
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
            this.companyInsertReqDto.patchValue({
              ext:resultExtension,file:resultBase64
            })

          })
        }
      }
}