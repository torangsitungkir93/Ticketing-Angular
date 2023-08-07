import { Injectable } from "@angular/core"
import { BaseService } from "./base.service"
import { PicCustResDto } from "../dto/pic-customer/pic-cust.res.dto"
import { BASE_URL } from "../constant/dto/api.constant"
import { Observable } from "rxjs"
import { PicCustReqDto } from "../dto/pic-customer/pic-cust.req.dto"


@Injectable({
    providedIn: 'root'
  })
  export class PicCustService {
    constructor(private base: BaseService) {
  
    }
  
    getAllPicCust(withToken: boolean): Observable < PicCustResDto[] > {
      return this.base.get < PicCustResDto[] > (`${BASE_URL}piccusts`, withToken)
    }

    insert( data:PicCustReqDto[], withToken : boolean):Observable<PicCustReqDto>{
      return this.base.post<PicCustReqDto>(`${BASE_URL}piccusts`,data,withToken)
    }
  
  }