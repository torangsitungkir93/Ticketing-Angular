import {
  Component,
  OnInit
} from "@angular/core";
import {
  AuthService
} from "../../services/auth.service";
import {
  RoleCode
} from "src/app/constant/role.code";
import {
  Route,
  Router
} from "@angular/router";
import {
  MenuItem
} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {

  imgUrl!: number;
  roleCode!: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // ngOnInit():void{
  //     const profile = this.authService.getProfile();
  //     if(profile){
  //         this.imgUrl = profile.photoId;
  //             this.roleCode = profile.roleCode
  //     }
  // }

  get isAdmin() {
    return this.roleCode == RoleCode.SUPERADMIN
    return true;
  }

  get isPic() {
    return this.roleCode == RoleCode.PIC
    return true;
  }

  get isCustomer() {
    return this.roleCode == RoleCode.CUST
    return true;
  }

  get isDeveloper() {
    return this.roleCode == RoleCode.DEVELOPER
    return true;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  // contoh
  items: MenuItem[] | undefined;

  ngOnInit() {
    //
    const profile = this.authService.getProfile();
    if (profile) {
      this.imgUrl = profile.photoId;
      this.roleCode = profile.roleCode
    }
    //Primeng
    this.items = [{
        label: 'Ticketing - Torangto',
        icon:'pi pi-fw pi-ticket',
        routerLink: "/dashboard",
      },{
        label: 'Home',
        icon : 'pi pi-spin pi-box',
        routerLink: "/dashboard",
      },
      {
        label: 'Master Data',
        icon : "pi pi-fw pi-server",
        items: [{
            label: 'List-User',
            routerLink: "/users",
            icon : 'pi pi-fw pi-user',
            visible : this.isAdmin
          },
          {
            label: 'Company',
            routerLink: "/companies",
            icon : 'pi pi-fw pi-building',
            visible : this.isAdmin
          },
          {
            label: 'Product List',
            routerLink: "/products",
            icon : 'pi pi-fw pi-book',
            visible : this.isAdmin
          },
          {
            label: 'Subscribed Product',
            routerLink: "/subscriber",
            icon : 'pi pi-fw pi-box',
            visible : this.isAdmin
          },
          {
            label: 'PIC Customer',
            routerLink: "/pic-customer",
            icon : 'pi pi-fw pi-users',
            visible : this.isAdmin
          },
          {
            label: 'My Subscribed Product',
            routerLink: "/subscriber",
            icon : 'pi pi-fw pi-box',
            visible : this.isCustomer
          },
          {
            label: 'My Ticket (User)',
            routerLink: "/tickets",
            icon : 'pi pi-fw pi-ticket',
            visible : this.isCustomer
          },
          {
            label: 'My Ticket (PIC)',
            routerLink: "/tickets/ticket-pic",
            icon : 'pi pi-fw pi-ticket',
            visible : this.isPic
          },
          {
            label: 'My Ticket (Dev)',
            icon : 'pi pi-fw pi-ticket',
            routerLink: "/tickets",
            visible : this.isDeveloper
          }
        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [{
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            routerLink: "/users/profile",
          },
          {
            label: 'Change Password',
            icon: 'pi pi-fw pi-cog',
            routerLink: "/users/change-password",
          },
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
              this.logout()
            }
          }
        ]
      },
      {
        label: 'About',
        items: [{
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [{
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          },
          {
            label: 'Contact',
            items: [{
              label: 'Remove',
              icon: 'pi pi-fw pi-calendar-minus'
            }]
          }
        ]
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.logout()
        }
      }
    ];
  }
}