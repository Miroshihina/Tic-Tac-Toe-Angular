import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {TokenService} from "./tokenService";
import {User} from "../models/user";
import {Token} from "../models/token";

export const ACCESS_TOKEN_KEY = "my top secret key";

@Injectable()
export class AuthService {

  urlRegister: string = "https://localhost:44335/Auth/register";

  urlLogin: string = "https://localhost:44335/Auth/login";

  urlUser: string = "https://localhost:44335/Auth/homePage";

  http: HttpClient;
  jwtHelper: JwtHelperService;
  tokenService: TokenService;

  userAuthorizedChange: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(http: HttpClient, jwtHelper: JwtHelperService, tokenService: TokenService) {
    this.http = http;
    this.jwtHelper = jwtHelper;
    this.tokenService = tokenService;
  }

  register(user: User): Observable<Token> {
    let postRequest = this.http.post<Token>(this.urlRegister, user);
    return postRequest;
  }

  login(user: User): Observable<Token> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    };
    let postRequest = this.http.post<Token>(this.urlLogin, user, requestOptions).pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.Value);
        this.userAuthorizedChange.next(true);
        }
      ));
    return postRequest;
  }

  getCurrentUser() {
    if (this.tokenService.getJWTToken() != null) {
      return this.http.get<{ username: string }>(this.urlUser, {headers: this.tokenService.getHeadersWithToken()});
    }
    return null;
  }

  checkIsUserAuthorized(): boolean {
    let userName;
    if (this.getCurrentUser() != null) {
      // @ts-ignore
      this.getCurrentUser().subscribe(x => userName = x.username);
    } else return false
    if (userName != null) {
      return true;
    } else return false;

  }
}
