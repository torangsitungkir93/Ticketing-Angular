import { Component, OnInit } from "@angular/core";
import { RoleCode, RoleName } from "src/app/constant/role.code";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector : 'dashboard',
    templateUrl : 'dashboard.component.html'
})
export class DashboardComponent implements OnInit{

    fullName='';
    roleName='';
    constructor(private authService : AuthService){}

    ngOnInit(): void {
        const profile = this.authService.getProfile();
        if(profile){
            this.fullName = profile.fullName;
            if(profile.roleCode==RoleCode.CUST){
                this.roleName = RoleName.CUST;
            }else if (profile.roleCode==RoleCode.SUPERADMIN){
                this.roleName = RoleName.SUPERADMIN;
            }
            else if (profile.roleCode==RoleCode.PIC){
                this.roleName = RoleName.PIC;
            }
            else if (profile.roleCode==RoleCode.DEVELOPER){
                this.roleName = RoleName.DEVELOPER;
            }
            
        }
    }

}