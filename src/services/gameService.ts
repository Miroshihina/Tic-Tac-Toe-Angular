import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GameService {
  private urlProfile: string = "https://localhost:44335/Auth/profile";

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getGamePointsList(userName: string) {
    return this.http.get<{ username: string }>(this.urlProfile, {
      params: {
       userName: userName
      }});
  }
}
