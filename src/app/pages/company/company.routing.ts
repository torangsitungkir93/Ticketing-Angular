import { NgModule } from "@angular/core";
import { CompanyListComponent } from "./company-list/company-list.component";
import { RouterModule, Routes } from "@angular/router";
import { CompanyInsertComponent } from "./company-insert/company-insert.component";
import { CompanyUpdateComponent } from "./company-update/company-update.component";
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
        component : CompanyListComponent
    },{
        path : 'new',
        component : CompanyInsertComponent
    },{
        path : 'update/:id',
        component : CompanyUpdateComponent
    }
];

@NgModule({
    declarations : [
        CompanyInsertComponent,
        CompanyUpdateComponent,
        CompanyListComponent
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
        RouterModule,
        CompanyInsertComponent,
        CompanyUpdateComponent,
        CompanyListComponent
    ]
 } )

export class CompanyRouting {

}