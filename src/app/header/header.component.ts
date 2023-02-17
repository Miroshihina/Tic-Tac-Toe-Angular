import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/authService";
import {MatToolbarModule} from "@angular/material/toolbar";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authService: AuthService;

  isAvatarIconActive: boolean = false;

  isUserAuthorized: boolean = false;

  constructor(authService: AuthService) {
    this.authService = authService
  }

  onIconClick(): void{
    this.isAvatarIconActive = !this.isAvatarIconActive;
  }
  onExitLinkClick(): void{
    this.authService.exit();
  }

  ngOnInit(): void {
    this.isUserAuthorized = this.authService.checkIsUserAuthorized();
  }
}
