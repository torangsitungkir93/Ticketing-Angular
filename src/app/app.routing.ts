import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes : Routes = [
    {
        path : 'users',
        loadChildren : () =>import ('./pages/users/user.module')
        .then(u => u.UserModule)
    }
]
@NgModule({
    imports : [
        RouterModule.forRoot(routes)
    ],
    exports : [
        RouterModule
    ]
})
export class AppRouting{

}