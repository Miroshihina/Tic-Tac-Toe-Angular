import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import {RouterModule, Routes} from "@angular/router";
import {RegistrationPageComponent} from './registration-page/registration-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {UserProfilePageComponent} from './user-profile-page/user-profile-page.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {JwtModule} from "@auth0/angular-jwt";
import {environment} from "../environments/environment";
import {ACCESS_TOKEN_KEY, AuthService} from "../services/authService";
import {ReactiveFormsModule} from "@angular/forms";
import {TokenService} from "../services/tokenService";
import {HttpClientModule} from "@angular/common/http";
import {GameService} from "../services/gameService";
import {MatToolbarModule} from "@angular/material/toolbar";

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

const routes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full'},
  {path: 'profile', component: UserProfilePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegistrationPageComponent},
  {path: '**', component: NotFoundPageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    HomePageComponent,
    UserProfilePageComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatInputModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenWhiteListedDomains
      }
    }),
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
  ],
  providers: [AuthService, TokenService, GameService,],
  bootstrap: [AppComponent]
})
export class AppModule {
}
