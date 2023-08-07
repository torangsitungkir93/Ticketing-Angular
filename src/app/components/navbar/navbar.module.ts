import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { UrlPipe } from "../pipe/url.pipe";
import { MenubarModule } from 'primeng/menubar';

@NgModule({
    declarations : [
        NavbarComponent
    ],imports :[
        RouterModule,
        CommonModule,
        MenubarModule,
        UrlPipe
    ], 
    exports : [
        NavbarComponent
    ]
})

export class NavbarModule{

}