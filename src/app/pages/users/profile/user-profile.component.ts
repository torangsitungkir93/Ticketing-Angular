import { Component, OnInit } from "@angular/core";
import { UserDetailResDto } from "src/app/dto/user/user-details.res.dto";
import { UsersResDto } from "src/app/dto/users-res.dto";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { UserChangePhoto } from "../change-photo/user.change-photo.component";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector : 'user-profile',
    templateUrl : './user-profile.html'
})
export class UserProfile implements OnInit{
    id! :number;
    userResDto?: UserDetailResDto|undefined;

    displayChangePhotoModal=false;
    userPhotoReqDto = this.fb.group({
        userId: [0, [Validators.required]],
        ext: [''],
        file: ['']
      });


    constructor(private userService : UserService, 
        private authService : AuthService,
        private fb: NonNullableFormBuilder,
        private router: Router){}

    ngOnInit(): void {
        this.id  = this.authService.getUserId();
        this.userService.getUserByid(this.id,true).subscribe(result => {
            this.userResDto = result
            this.userPhotoReqDto.get('userId')?.setValue(this.userResDto.id);
        })
    }

    showChangePhotoModal(){
      this.displayChangePhotoModal = true;
    }

    changePhoto(){
        this.userPhotoReqDto.value.userId = this.id;
        const data = this.userPhotoReqDto.getRawValue();
            this.userService.update(data,true).subscribe(result => {
                this.router.navigateByUrl(`users`);
            })
    }

    fileUpload(event: any) {
        const toBase64 = (file: File) => new Promise < string > ((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            if (typeof reader.result === "string") resolve(reader.result)
          };
          reader.onerror = error => reject(error);
        });
    
        for (let file of event.files) {
          toBase64(file).then(result => {
            const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
            const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)
            this.userPhotoReqDto.patchValue({
              ext: resultExtension,
              file: resultBase64
            })
          })
        }
      }
}