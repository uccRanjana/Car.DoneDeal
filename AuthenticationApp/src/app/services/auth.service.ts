import { HttpClient } from '@angular/common/http';
import { Injectable, inject , PLATFORM_ID, Inject} from '@angular/core';
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  http = inject(HttpClient);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  registerService(registerObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }
  loginService(loginObj: any){

    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }

  sendEmailService(email: string){
    return this.http.post<any>(`${apiUrls.authServiceApi}send-email`, {email: email});
  }

  resetPasswordService(resetObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}reset-password`, resetObj);
  }
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem("user_id");
    }
    return false;
  }

  

}
