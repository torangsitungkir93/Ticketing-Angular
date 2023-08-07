import {
  Injectable
} from "@angular/core";
import {
  BaseService
} from "./base.service";
import {
  UserResDto
} from "../dto/user/user-res.dto";
import {
  Observable
} from "rxjs";
import {
  UserInsertReqDto
} from "../dto/user/user-insert.req.dto";
import {
  BASE_URL
} from "../constant/dto/api.constant";
import { UserUpdatePhotoReqDto } from "../dto/user/user-update-photo.req.dto";
import { UserDetailResDto } from "../dto/user/user-details.res.dto";
import { UserChangePassword } from "../pages/users/change-password/user.change-password.component";
import { ChangePasswordReqDto } from "../dto/user/change-password.req.dto";
import { UpdateResDto } from "../dto/update-res.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private base: BaseService) {}

  getUser(withToken: boolean): Observable < UserResDto[] > {
    return this.base.get < UserResDto[] > (`${BASE_URL}users`, withToken);
  }
  getUserByid(id:number,withToken: boolean): Observable < UserDetailResDto > {
    return this.base.get < UserDetailResDto > (`${BASE_URL}users/detail?id=${id}`, withToken);
  }
  getCustomer(withToken: boolean): Observable < UserResDto[] > {
    return this.base.get < UserResDto[] > (`${BASE_URL}users?rolecode=CST`, withToken);
  }

  getDeveloper(withToken: boolean): Observable < UserResDto[] > {
    return this.base.get < UserResDto[] > (`${BASE_URL}users?rolecode=DEV`, withToken);
  }

  getPic(withToken: boolean): Observable < UserResDto[] > {
    return this.base.get < UserResDto[] > (`${BASE_URL}users?rolecode=PIC`, withToken);
  }

  insert(data: UserInsertReqDto, withToken: boolean): Observable < UserInsertReqDto > {
    return this.base.post < UserInsertReqDto > (`${BASE_URL}users`, data, withToken);
  }

  update(data: UserUpdatePhotoReqDto, withToken: boolean): Observable < UserUpdatePhotoReqDto > {
    return this.base.patch < UserUpdatePhotoReqDto > (`${BASE_URL}users`, data, withToken)
  }
  changePassword(data: ChangePasswordReqDto, withToken: boolean): Observable < UpdateResDto > {
    return this.base.patch < UpdateResDto > (`${BASE_URL}users/change-password`, data, withToken)
  }

}