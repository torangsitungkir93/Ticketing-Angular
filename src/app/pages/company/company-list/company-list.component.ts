import { Component, OnInit } from "@angular/core";
import { CompanyDataResDto } from "src/app/dto/company/company-data.res.dto";
import { CompanyService } from "src/app/services/company.service";

@Component({
    selector : 'company-list',
    templateUrl : './company-list.component.html'
})
export class CompanyListComponent implements OnInit{
    companies! : CompanyDataResDto[];

    constructor (private companyService : CompanyService){

    }

    ngOnInit() : void{
        this.getCompany();
    }

    getCompany(){
        this.companyService.getCompanies(true).subscribe(result => {
            this.companies= result;
        })
    }

    getPhotoUrl(base64String: string): string {
        return 'data:image/jpeg;base64,' + base64String;
      }
}