import { Component, OnInit } from '@angular/core';
import { ProductResDto } from "../../../dto/product/product.res.dto";
import { ProductService } from "../../../services/product.service";

@Component({
    selector : 'product-list',
    templateUrl : './product-list.component.html'
})
export class ProductListComponent implements OnInit{
    products!:ProductResDto[]
  
    constructor(private productService:ProductService){}
  
    ngOnInit(): void {
      this.getProducts()
    }
  
    getProducts(){
      this.productService.getAllProduct(true).subscribe(result => {
        this.products = result
      })
    }
  }