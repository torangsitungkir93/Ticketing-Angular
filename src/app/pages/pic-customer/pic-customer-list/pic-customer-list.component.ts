import { Component } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PicCustReqDto } from "src/app/dto/pic-customer/pic-cust.req.dto";
import { PicCustResDto } from "src/app/dto/pic-customer/pic-cust.res.dto";
import { UserResDto } from "src/app/dto/user/user-res.dto";
import { PicCustService } from "src/app/services/pic-cust.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector : 'pic-customer-list',
    templateUrl : './pic-customer-list.component.html'
})

export class PicCustomerComponent{
    picCustomerResDto!: PicCustResDto[];
    customer! : UserResDto[];
    pic! : UserResDto[];
    picCustReqDto : PicCustReqDto[] = [];
    visible:boolean=false;

    assignPicCust = this.fb.group({
      data:this.fb.array(this.picCustReqDto)
    })
    constructor(
      private picCustService: PicCustService,
      private userService : UserService,
      private fb: NonNullableFormBuilder,
      private router: Router) {}
  
    ngOnInit(): void {
      this.getCustomer();
      this.getPic();
      this.getPicCustomer();
    }
  
    getCustomer(){
      this.userService.getCustomer(true).subscribe(result => {
        this.customer= result;
    })
    }

    detail(){
      this.visible=true;
    }
  
    getPic(){
        this.userService.getPic(true).subscribe(result => {
            this.pic= result;
    })}

    get assignPic(){
      return this.assignPicCust.get('data') as FormArray;
    }
  
    getPicCustomer() {
        this.picCustService.getAllPicCust(true).subscribe(result => {
            this.picCustomerResDto = result;
        })
    }
  
    insert() {
      const data = this.assignPicCust.getRawValue();
      if (this.assignPicCust.valid) {
        this.picCustService.insert(data.data, true).subscribe(result => {
          this.router.navigateByUrl('pic-customer');
        })
      }
    }
    onAdd(){
      this.assignPic.push(this.fb.group({
        picId: [0, [Validators.required]],
        customerId: [0, [Validators.required]]
      }))
    }
    onRemove(i:number){
      this.assignPic.removeAt(i);
    }
}