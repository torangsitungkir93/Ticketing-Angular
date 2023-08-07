
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    constructor(private http: HttpClient,
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router
        ) { }

    private get token(): string | null {
        const profile = this.authService.getProfile()
        if (profile && profile.token) {
            return profile.token
        }
        return null
    }

    private get header() {
        return {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        }
    }

    post<T>(url: string, body: any, withToken = true): Observable<T> {
        return this.http.post<T>(url, body, (withToken ? this.header : undefined))
            .pipe(response(this.messageService,this.router))
           
    }

    get<T>(url: string, withToken = true): Observable<T> {
        return this.http.get<T>(url, (withToken ? this.header : undefined))
        .pipe(response(this.messageService,this.router))
    }

    patch<T>(url: string, body: any, withToken = true): Observable<T> {
        return this.http.patch<T>(url, body, (withToken ? this.header : undefined))
        .pipe(response(this.messageService,this.router))
    }

    put<T>(url: string, body: any, withToken = true): Observable<T> {
        return this.http.patch<T>(url, body, (withToken ? this.header : undefined))
        .pipe(response(this.messageService,this.router))
    }
  }
  function response<T>(messageService: MessageService,router:Router) {
      return tap<T>({
          next: (data) => {
              console.log(data)
              if(data && (data as any).message){
                  messageService.add({severity:'success',summary:'Success',detail:(data as any).neesage});
              }
          },
          error: (err) => {
              if (err instanceof HttpErrorResponse)
                  if (err && err.error && err.error.message) {
                      messageService.add({severity:'error',summary:'Error',detail:(err.error.message)})
                  }
              console.log(err.message)
              if(err.status == 401 && err.error.message == 'Token Expired'){
                localStorage.clear()
                router.navigateByUrl('/login')
              }
          }
      })
  }

