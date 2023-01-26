import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {ACCESS_TOKEN_KEY} from "./authService";

@Injectable()
export class TokenService {
  public getHeadersWithToken() {
    // create authorization header with jwt token
    let currentUser = localStorage.getItem(ACCESS_TOKEN_KEY);
    let token = JSON.parse(JSON.stringify(currentUser));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return headers;
  }

  public getJWTToken(){
    let currentUser = localStorage.getItem(ACCESS_TOKEN_KEY);
    let token = JSON.parse(JSON.stringify(currentUser));
  }
}
