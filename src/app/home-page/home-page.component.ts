import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/authService";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  authService: AuthService;
  @Output() IsUserAuthorizedOutput = new EventEmitter<boolean>();
  constructor(authService: AuthService) {
    this.authService = authService
  }

  ngOnInit(): void {
  }
}
