import { NgModule } from "@angular/core";
import { BaseComponent } from "./base.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { NavbarModule } from "../navbar/navbar.module";
import { RouterModule } from "@angular/router";


@NgModule({
    declarations : [
        BaseComponent
    ],
    imports : [
        NavbarModule,
        RouterModule
    ],exports : [
        NavbarComponent
    ]
})

export class BaseModule{

}