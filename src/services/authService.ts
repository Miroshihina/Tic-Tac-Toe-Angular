import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {TokenService} from "./tokenService";
import {LoginUserData} from "../models/loginUserData";
import {Token} from "../models/token";
import {Router} from "@angular/router";

export const ACCESS_TOKEN_KEY = "my top secret key";

@Injectable()
export class AuthService {

  urlRegister: string = "https://localhost:44335/Auth/register";

  urlLogin: string = "https://localhost:44335/Auth/login";

  urlUser: string = "https://localhost:44335/Auth/profile";

  http: HttpClient;
  jwtHelper: JwtHelperService;
  tokenService: TokenService;
  private router: Router;

  constructor(http: HttpClient, jwtHelper: JwtHelperService, tokenService: TokenService, router: Router) {
    this.http = http;
    this.jwtHelper = jwtHelper;
    this.tokenService = tokenService;
    this.router = router;
  }

  register(user: LoginUserData): Observable<Token> {
    let postRequest = this.http.post<Token>(this.urlRegister, user);
    return postRequest;
  }

  exit(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.navigateToHomePaige();
  }
  private navigateToHomePaige(): void{
    this.router.navigate(
      [''],
    ).then(r => window.location.reload());

  }
  login(user: LoginUserData): Observable<string> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    };
    let postRequest = this.http.post<string>(this.urlLogin, user, requestOptions).pipe(
      tap(token => {
          localStorage.setItem(ACCESS_TOKEN_KEY, token);
          this.navigateToHomePaige();
        }
      ));
    return postRequest;
  }

  checkIsUserAuthorized(): boolean {
    let storageValue = localStorage.getItem(ACCESS_TOKEN_KEY)
    if (storageValue != null) {
      return true
    }
    return false;
  }

  getCurrentUser() {
    let userName = this.http.get<{ username: string }>(this.urlUser, {headers: this.tokenService.getHeadersWithToken()});
    return userName;
  }

//TODO доделать запрос с получением побед/поражений
  sendQueryUserName(userName: string) {
    this.router.navigate(
      ['/profile'],

      {queryParams: {userName: userName}}
    );
  }
}
