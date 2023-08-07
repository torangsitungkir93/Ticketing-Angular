import { Component } from "@angular/core";
import { UserResDto } from "src/app/dto/user/user-res.dto";
import { UserService } from "src/app/services/user.service";

interface Column {
    field: string;
    header: string;
}

@Component({
    selector : 'user-list',
    templateUrl : './user-list.component.html'
})
export class UserListComponent{
    users! : UserResDto[];
    cols!: Column[];

    constructor (private userService : UserService){

    }

    ngOnInit() : void{
        this.getUser();
    }

    getUser(){
        this.userService.getUser(true).subscribe(result => {
            this.users= result;
        })
    }
    
}