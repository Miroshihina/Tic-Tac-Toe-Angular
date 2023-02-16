import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/authService";
import {BehaviorSubject} from "rxjs";
import {Token} from "../../models/token";
import {LoginUserData} from "../../models/loginUserData";
import {GameService} from "../../services/gameService";

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {
  authService: AuthService;
  userProfileSubject = new BehaviorSubject<{username: string}>({username: ""});
  userName: string = "";
  gameService: GameService;

  constructor(authService: AuthService, gameService: GameService) {
    this.authService = authService;
    this.gameService = gameService;
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(x => {this.userName = x.username;  this.authService.sendQueryUserName(this.userName);});
  }

}
