import {
  Component
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators
} from "@angular/forms";
import {
  Title
} from "@angular/platform-browser";
import {
  Router
} from "@angular/router";

import {
  LoginReqDto
} from "src/app/dto/login/login.req.dto";
import {
  AuthService
} from "src/app/services/auth.service";
import {
  LoginService
} from "src/app/services/login.service";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loading = false;
  heading = true;
  loginReqDto = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private fb: NonNullableFormBuilder,
    private title: Title,
    private router: Router) {
    this.title.setTitle('Dashboard | Tickekting Torangto');
  }

  showHeading() {
    this.heading = !this.heading;
  }

  onLogin() {
    if (this.loginReqDto.valid) {
      this.loading = true;
      this.loginService.Login(this.loginReqDto.getRawValue()).subscribe({
        next: (result) => {
            this.loading = false;
            localStorage.setItem('userData', JSON.stringify(result));
            this.router.navigateByUrl('/dashboard')
        },
        error: () =>{
            this.loading=false;
        }
      })
    }
  }

}