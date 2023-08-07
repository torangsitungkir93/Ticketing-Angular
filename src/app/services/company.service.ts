import {
  Injectable
} from "@angular/core";
import {
  BaseService
} from "./base.service";
import {
  Observable
} from "rxjs";
import {
  CompanyDataResDto
} from "../dto/company/company-data.res.dto";
import {
  CompanyInsertReqDto
} from "../dto/company/coompany-insert.req.dto";
import {
  BASE_URL
} from "../constant/dto/api.constant";
import {
  UpdateResDto
} from "../dto/update-res.dto";
import {
  CompanyUpdateReqDto
} from "../dto/company/company-update.req.dto";
import { InsertResDto } from "../dto/insert-res.dto";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private base: BaseService) {}

  getCompanies(withToken: boolean): Observable < CompanyDataResDto[] > {
    return this.base.get < CompanyDataResDto[] > ('http://localhost:8080/companies', withToken);
  }

  insert(data: CompanyInsertReqDto, withToken: boolean): Observable < InsertResDto > {
    return this.base.post < InsertResDto > (`${BASE_URL}companies`, data, withToken)
  }

  update(data: CompanyUpdateReqDto, withToken: boolean): Observable < UpdateResDto > {
    return this.base.patch < UpdateResDto > (`${BASE_URL}companies`, data, withToken)
  }
  getById(id: number): Observable < CompanyDataResDto > {
    return this.base.get < CompanyDataResDto > (`${BASE_URL}companies/detail?id=${id}`)
  }

}