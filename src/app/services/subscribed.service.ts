import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { ProductCustResDto } from "../dto/product-customer/product-cust.res.dto";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/dto/api.constant";
import { ProductCustReqDto } from "../dto/product-customer/product-cust.req.dto";

@Injectable({
    providedIn: 'root'
  })
  export class SubscribedService {
    constructor(private base: BaseService) {
  
    }
  
    getAllSubscriber(withToken: boolean): Observable < ProductCustResDto[] > {
      return this.base.get < ProductCustResDto[] > (`${BASE_URL}products-cust`, withToken)
    }

    getAllSubscriberByIdCust(id:number,withToken: boolean): Observable < ProductCustResDto[] > {
      return this.base.get < ProductCustResDto[] > (`${BASE_URL}products-cust?=${id}`, withToken)
    }

    insert( data:ProductCustReqDto[], withToken : boolean):Observable<ProductCustReqDto>{
      return this.base.post<ProductCustReqDto>(`${BASE_URL}products-cust`,data,withToken)
    }
  
  }