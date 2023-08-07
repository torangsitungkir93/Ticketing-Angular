import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector : 'user-change-password',
    templateUrl : './user-change-password.html'
})
export class UserChangePassword {
    changePassDto = this.fb.group({
        oldPassword : ['',Validators.required],
        newPassword : ['',Validators.required]
    })

    constructor(
        private auth:AuthService,
        private userService:UserService,
        private fb:NonNullableFormBuilder,
        private router : Router
    ){}

    onSubmit(){
        if(this.changePassDto.valid){
            const data = this.changePassDto.getRawValue()
            
            this.userService.changePassword(data,true).subscribe(result => {
                console.log(result)
                this.router.navigateByUrl('/dashboard')
            })
        }else{
            console.log('invalid')
        }
    }

}