import { Input, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaseComponent } from "./components/base/base.component";
import { BaseModule } from "./components/base/base.module";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { roleValidation } from "./validation/role.validation";
import { RoleCode } from "./constant/role.code";
import { authValidation } from "./validation/auth.validation";
import { UrlPipe } from "./components/pipe/url.pipe";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Card, CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Avatar, AvatarModule } from 'primeng/avatar';


const routes : Routes = [
    {
        component : BaseComponent,
        path : 'users',
        loadChildren : () =>import ('./pages/users/user.module')
        .then(u => u.UserModule)
    },{
        component : BaseComponent,
        path : 'companies',
        loadChildren : () => import ('./pages/company/company.module')
        .then(c => c.CompanyModule)
    },{
        component : BaseComponent,
        path : 'products',
        loadChildren : () => import ('./pages/product/product.module')
        .then(p => p.ProductModule)
    },{
        component : BaseComponent,
        path : 'tickets',
        loadChildren : () => import ('./pages/ticket/ticket.module')
        .then(t => t.TicketModule)
    },{
        component : BaseComponent,
        path : 'subscriber',
        loadChildren : () => import ('./pages/subscribed-product/subscribed-product.module')
        .then(s => s.subscribedModule)
    },{
        component : LoginComponent,
        path : 'login',
        canMatch : [authValidation]
    },{
        component : BaseComponent,
        path : 'pic-customer',
        loadChildren : () => import ('./pages/pic-customer/pic-customer.module')
        .then(p => p.PicCustModule)
    },{
        component : BaseComponent,
        path : 'dashboard',
        children : [{
            path : '',
            component : DashboardComponent
        }
        ]
    },{
        path : '',
        redirectTo : '/login',
        pathMatch : "full"
    },{
        path : '**',
        component : NotFoundComponent
    }
]

@NgModule({
    declarations : [
        DashboardComponent,
        LoginComponent
    ],
    imports : [
        RouterModule.forRoot(routes),
        BaseModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        UrlPipe,
        BrowserModule,
        ButtonModule,
        BrowserAnimationsModule,
        InputTextModule,
        CardModule,
        ToastModule,
        AvatarModule
        

    ],
    exports : [
        RouterModule,
        FormsModule
    ]
})
export class AppRouting{

}