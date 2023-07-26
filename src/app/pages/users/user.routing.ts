import { NgModule } from "@angular/core";
import { UserListComponent } from "./list/user-list.component";
import { RouterModule, Routes } from "@angular/router";
import { UserCreateComponent } from "./create/user.create.component";

const routes : Routes = [
    {
        path : '',
        component : UserListComponent
    },
    {
        path : 'new',
        component : UserCreateComponent
    }
];

@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [
        RouterModule
    ]
})
export class UserRouting{

}