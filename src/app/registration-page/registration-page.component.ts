import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/authService";
import {BehaviorSubject} from "rxjs";
import {Token} from "../../models/token";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  username: FormControl;
  password: FormControl;
  registrationSubject: BehaviorSubject<Token>;

  constructor(private auth: AuthService) {
    this.username = this.getFormControl();
    this.password = this.getFormControl();
    this.registrationSubject = new BehaviorSubject<Token>(new Token());
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
    let register = this.auth.register(this.form.value);

    register.subscribe(x => this.registrationSubject.next(x));
  }
}
