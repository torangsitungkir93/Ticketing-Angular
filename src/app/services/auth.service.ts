import { Injectable } from "@angular/core";
import { LoginResDto } from "../dto/login/login.res.dto";

@Injectable({
    providedIn : 'root'
})
export class AuthService{
    getProfile() : LoginResDto|null{
        const data = localStorage.getItem('userData')
        if(data){
            return JSON.parse(data);
        }
        return null;
    }

    getUserId(): number {
        const profile = this.getProfile()
        if (profile && profile.id) {
          return profile.id
        }
        return 0
      }

      getRoleCode() : string{
        const profile = this.getProfile()
        if (profile) {
          return profile.roleCode
        }
        return ''
      }
}