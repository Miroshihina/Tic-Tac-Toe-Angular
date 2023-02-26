import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";
import {TokenService} from "./tokenService";
import {LoginUserData} from "../models/loginUserData";
import {Token} from "../models/token";
import {Router} from "@angular/router";

export const ACCESS_TOKEN_KEY = "my top secret key";

interface ILoginResult {
  token: string;
  success: boolean;
}

@Injectable()
export class AuthService {

  urlRegister: string = "https://localhost:44335/Auth/register";

  urlLogin: string = "https://localhost:44335/Auth/login";

  urlUser: string = "https://localhost:44335/Auth/profile";

  http: HttpClient;
  jwtHelper: JwtHelperService;
  tokenService: TokenService;
  isUserAuthorized: Subject<boolean> = new Subject<boolean>();
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
    this.navigateToHomePage();
    this.isUserAuthorized.next(false);
  }

  private navigateToHomePage(): void {
    this.router.navigate(['']);
  }

  login(user: LoginUserData): Observable<ILoginResult> {
    let postRequest = this.http.post<ILoginResult>(this.urlLogin, user).pipe(
      tap(result => {
          if (result.success) {
            localStorage.setItem(ACCESS_TOKEN_KEY, result.token);
            this.navigateToHomePage();
            this.isUserAuthorized.next(true);
          } else {
            this.isUserAuthorized.next(false);
            //TODO result not success
          }
        }
      ));
    return postRequest;
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
