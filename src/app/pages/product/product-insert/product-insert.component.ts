import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "src/app/services/product.service";

@Component({
    selector : 'product-insert',
    templateUrl : './product-insert.component.html'
})
export class ProductInsertComponent implements OnInit{

    productInsertReqDto = this.fb.group({
        productCode : ['',[Validators.required]],
        productName : ['',[Validators.required]]
    })

    constructor (
        private productService:ProductService,
        private fb: NonNullableFormBuilder,
        private router : Router
    ){
        
    }

    ngOnInit(){

    }
    insert() {
        const data = this.productInsertReqDto.getRawValue();
        if (this.productInsertReqDto.valid) {
          this.productService.insert(data, true).subscribe(result => {
            this.router.navigateByUrl('products');
          })
        }
      }
}