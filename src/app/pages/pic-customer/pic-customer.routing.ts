import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PicCustomerComponent } from "./pic-customer-list/pic-customer-list.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';


const routes : Routes = [
    {
        path : '',
        component : PicCustomerComponent
    }
];

@NgModule({
    declarations : [
        PicCustomerComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        DropdownModule,
        TableModule,
        ButtonModule,
        DialogModule
    ],
    exports : [
        RouterModule,
        PicCustomerComponent
    ]
})
export class PicCustomerRouting{

}