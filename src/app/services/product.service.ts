import { Injectable } from "@angular/core"
import { BaseService } from "./base.service"
import { ProductResDto } from "../dto/product/product.res.dto"
import { Observable } from "rxjs"
import { BASE_URL } from "../constant/dto/api.constant"
import { ProductInsertReqDto } from "../dto/product/product-insert.req.dto"
import { UpdateResDto } from "../dto/update-res.dto"
import { ProductUpdateReqDto } from "../dto/product/product-update.req.dto"
import { InsertResDto } from "../dto/insert-res.dto"

@Injectable({
    providedIn:'root'
  })
  
  export class ProductService{
    constructor(private base:BaseService) {
  
    }
  
    getAllProduct(withToken:boolean):Observable<ProductResDto[]>{
      return this.base.get<ProductResDto[]>(`${BASE_URL}products`,withToken)
    }
  
    insert( data:ProductInsertReqDto, withToken : boolean):Observable<InsertResDto>{
      return this.base.post<InsertResDto>(`${BASE_URL}products`,data,withToken)
    }
  
    update( data:ProductUpdateReqDto , withToken : boolean):Observable<UpdateResDto>{
      return this.base.patch<UpdateResDto>(`${BASE_URL}products`,data,withToken)
    }

    getById(id: number): Observable < ProductResDto > {
      return this.base.get < ProductResDto > (`${BASE_URL}products/detail?id=${id}`)
    }
}
  