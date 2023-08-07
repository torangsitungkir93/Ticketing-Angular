import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductResDto } from "src/app/dto/product/product.res.dto";
import { ProductService } from "src/app/services/product.service";

@Component({
    selector : 'product-update',
    templateUrl : './product-update.component.html'
})
export class ProductUpdateComponent{
    productDataResDto! : ProductResDto;
    idParam! : number;
    productUpdateReqDto = this.fb.group({
        id : [0],
        productCode : ['', [Validators.required]],
        productName:['', [Validators.required]],
    })
    constructor (
        private productService : ProductService,
        private activatedRoute : ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private router : Router
    ){}

    init(){
        this.activatedRoute.params.subscribe(id => {
            this.idParam = Number(Object.values(id));
        })
        this.productService.getById(this.idParam).subscribe(result=>{
            this.productDataResDto = result;
            this.productUpdateReqDto.patchValue({
                id : this.productDataResDto.id,
                productCode : this.productDataResDto.productCode,
                productName : this.productDataResDto.productName
            });
        })
    }

    submit(): void {
        const data = this.productUpdateReqDto.getRawValue();
        if(this.productUpdateReqDto.valid){
            this.productService.update(data,true).subscribe(result => {
                this.router.navigateByUrl(`products`);
            })
        }
    }

    ngOnInit():void{
        this.init();
    }
}