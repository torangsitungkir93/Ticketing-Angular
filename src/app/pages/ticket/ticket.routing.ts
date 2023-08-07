import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TicketListComponent } from "./ticket-list/ticket-list.component";
import { TicketInsertComponent } from "./ticket-insert/ticket-insert.component";
import { TicketDetailComponent } from "./ticket-detail/ticket-detail.component";
import { TicketListPicComponent } from "./ticket-list-pic/ticket-list-pic.component";
import { TicketListDeveloperComponent } from "./ticket-list-developer/ticket-list-developer.component";
import { TicketUpdateComponent } from "./ticket-update/ticket-update.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TicketDetailDevComponent } from "./ticket-detail-developer/ticket-detaildev.component";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { FileUploadModule } from "primeng/fileupload";
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { UrlPipe } from "../../components/pipe/url.pipe";
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { TagModule } from 'primeng/tag';

const routes : Routes = [
    {
        path : '',
        component : TicketListComponent
    }
    ,{
        path : 'new',
        component : TicketInsertComponent
    },{
        path : 'detail/:id',
        component : TicketDetailComponent
    },{
        path : 'ticket-pic',
        component : TicketListPicComponent
    },{
        path : 'ticket-developer',
        component : TicketListDeveloperComponent
    },{
        path : 'ticket-developer-detail/:id',
        component : TicketDetailDevComponent
    }
];

@NgModule({
    declarations: [
        TicketDetailComponent,
        TicketDetailDevComponent,
        TicketInsertComponent,
        TicketListComponent,
        TicketListDeveloperComponent,
        TicketListPicComponent,
        TicketUpdateComponent
    ],
    exports: [
        RouterModule,
        TicketDetailComponent,
        TicketDetailDevComponent,
        TicketInsertComponent,
        TicketListComponent,
        TicketListDeveloperComponent,
        TicketListPicComponent,
        TicketUpdateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        FileUploadModule,
        DialogModule,
        ConfirmDialogModule,
        ToastModule,
        InputTextareaModule,
        ScrollPanelModule,
        UrlPipe,
        PanelModule,
        FieldsetModule,
        TagModule
    ]
} )

export class TicketRouting {

}