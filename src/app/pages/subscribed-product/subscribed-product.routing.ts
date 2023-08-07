import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SubcribedProductListComponent } from "./subscribed-product-list/subscribed-product-list.component";
import { SubcribedProductInsertComponent } from "./subscribed-product-insert/subscribed-product-insert.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';

const routes : Routes = [
    {
        path : '',
        component : SubcribedProductListComponent
    }
    ,{
        path : 'new',
        component : SubcribedProductInsertComponent
    }
];

@NgModule({
    declarations : [
        SubcribedProductInsertComponent,
        SubcribedProductListComponent
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
        SubcribedProductInsertComponent,
        SubcribedProductListComponent
    ]
 } )

export class SubscribedRouting {

}