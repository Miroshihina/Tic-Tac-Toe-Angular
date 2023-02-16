import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/authService";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authService: AuthService;

  @Input() isUserAuthorized: boolean = false;

  constructor(authService: AuthService) {
    this.authService = authService
  }

  ngOnInit(): void {
    this.isUserAuthorized = this.authService.checkIsUserAuthorized();
    }
}
