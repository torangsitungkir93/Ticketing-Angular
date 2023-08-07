import {
  Component
} from "@angular/core";
import {
  FormArray,
  NonNullableFormBuilder,
  Validators
} from "@angular/forms";
import {
  Router
} from "@angular/router";
import { RoleCode } from "src/app/constant/role.code";
import { ProductCustReqDto } from "src/app/dto/product-customer/product-cust.req.dto";
import {
  ProductCustResDto
} from "src/app/dto/product-customer/product-cust.res.dto";
import { ProductResDto } from "src/app/dto/product/product.res.dto";
import {
  UserResDto
} from "src/app/dto/user/user-res.dto";
import { AuthService } from "src/app/services/auth.service";
import { ProductService } from "src/app/services/product.service";
import {
  SubscribedService
} from "src/app/services/subscribed.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'subscribed-product-list',
  templateUrl: './subscribed-product-list.component.html'
})

export class SubcribedProductListComponent {
  subscribeResDto!: ProductCustResDto[];
  subscriber!: UserResDto[];
  products! : ProductResDto[];
  subscribeReqDto : ProductCustReqDto[] = []
  roleCode! : string;
  visible:boolean = false;

  assignProductCust = this.fb.group({
    data:this.fb.array(this.subscribeReqDto)
  })

  constructor(
    private subscribedService: SubscribedService,
    private userService : UserService,
    private productService : ProductService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private authService:AuthService) {}

    private get userId(): number {
      const profile = this.authService.getProfile()
      if (profile && profile.id) {
        return profile.id
      }
      return 0
    }
  ngOnInit(){
    this.getProducts();
    this.getUsers();
    const profile = this.authService.getProfile()
    if (profile && profile.id) {
      this.roleCode = profile.roleCode;
    }
    if(this.isAdmin){
      this.getSubsProducts();
    }else if(this.isCustomer){
      this.getSubsProductsById();
    }
  }

  getUsers(){
    this.userService.getCustomer(true).subscribe(result => {
      this.subscriber= result;
  })
  }

  detail(){
    this.visible=true;
  }

  getProducts(){
    this.productService.getAllProduct(true).subscribe(result => {
      this.products = result
    })
  }
  get assignProduct(){
    return this.assignProductCust.get('data') as FormArray
  }

  getSubsProducts() {
    this.subscribedService.getAllSubscriber(true).subscribe(result => {
      this.subscribeResDto = result;
    })
  }

  getSubsProductsById(){
    this.subscribedService.getAllSubscriberByIdCust(this.userId,true).subscribe(result => {
      this.subscribeResDto = result;
    })
  }

  insert() {
    const data = this.assignProductCust.getRawValue();
    if (this.assignProductCust.valid) {
      this.subscribedService.insert(data.data, true).subscribe(result => {
        this.router.navigateByUrl('subscriber');
      })
    }
  }
  onAdd(){
    this.assignProduct.push(this.fb.group({
      customerId:[0,[Validators.required]],
      productId:[0,[Validators.required]]
    }))
  }
  onRemove(i:number){
    this.assignProduct.removeAt(i);
  }


 get isCustomer(){
    return this.roleCode==RoleCode.CUST
 }

 get isAdmin(){
    return this.roleCode==RoleCode.SUPERADMIN
 }

}