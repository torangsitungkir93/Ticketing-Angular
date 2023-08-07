import { Component, NgModule } from "@angular/core";
import { UserListComponent } from "./list/user-list.component";
import { RouterModule, Routes } from "@angular/router";
import { UserCreateComponent } from "./create/user.create.component";
import { UserChangePassword } from "./change-password/user.change-password.component";
import { UserProfile } from "./profile/user-profile.component";
import { UserChangePhoto } from "./change-photo/user.change-photo.component";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../../components/button/button.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

const routes : Routes = [
    {
        path : '',
        component : UserListComponent
    },
    {
        path : 'new',
        component : UserCreateComponent
    },{
        path : 'change-password',
        component : UserChangePassword
    },{
        path : 'profile',
        component : UserProfile
    },{
        path : 'detail/:id',
        component : UserProfile
    }
];

@NgModule({
    declarations : [
        UserListComponent,
        UserCreateComponent,
        UserChangePassword,
        UserChangePhoto,
        UserProfile
    ],
    imports : [
        RouterModule.forChild(routes),
        CommonModule,
        ButtonComponent,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        FileUploadModule,
        InputNumberModule,
        ConfirmDialogModule,
        DialogModule
    ],
    exports : [
        RouterModule,
        UserListComponent,
        UserCreateComponent,
        UserChangePassword,
        UserChangePhoto,
        UserProfile
    ]
})
export class UserRouting{

}