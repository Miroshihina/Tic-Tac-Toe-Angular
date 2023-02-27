import {Component, Input, OnInit} from '@angular/core';
import {ACCESS_TOKEN_KEY, AuthService} from "../../services/authService";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authService: AuthService;

  isUserAuthorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(authService: AuthService) {
    this.authService = authService
  }

  ngOnInit(): void {
    const accessTokenKey = localStorage.getItem(ACCESS_TOKEN_KEY);
    this.isUserAuthorized.next(accessTokenKey != null);

    this.authService.isUserAuthorized.subscribe(x => {
      this.isUserAuthorized.next(x);
    });
  }
}
