import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductInsertComponent } from "./product-insert/product-insert.component";
import { ProductUpdateComponent } from "./product-update/product-update.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';

const routes : Routes = [
    {
        path : '',
        component : ProductListComponent
    }
    ,{
        path : 'new',
        component : ProductInsertComponent
    },{
        path : 'update/:id',
        component : ProductUpdateComponent
    }
];

@NgModule({
    declarations : [
        ProductInsertComponent,
        ProductListComponent,
        ProductUpdateComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        FileUploadModule
    ],
    exports : [
        ProductInsertComponent,
        ProductListComponent,
        ProductUpdateComponent,
        RouterModule
    ]
 } )

export class ProductRouting {

}