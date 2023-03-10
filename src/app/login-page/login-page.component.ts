import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/authService";
import {BehaviorSubject} from "rxjs";
import {Token} from "../../models/token";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor(private auth: AuthService) {
    this.username = this.getFormControl();
    this.password = this.getFormControl();
  }

  private getFormControl() {
    return new FormControl(null, [Validators.required, Validators.min(4), Validators.max(15)],);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: this.username,
      password: this.password
    })
  }

  onSubmit(): void {
    this.auth.login(this.form.value).subscribe();
  }

}
