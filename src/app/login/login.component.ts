import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from "../session.service";
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  template: `
    <section>
      <h2>Logging in is on the honor system</h2>
      <h3>Please do not log in as someone else</h3>
      <form [formGroup]="loginForm" (submit)="doLogin()">
        <label for="login-id">Login</label>
        <input id="login-id" type="text" formControlName="loginId">

        <button type="submit">Log in</button>
      </form>
    </section>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  sessionService: SessionService = inject(SessionService);
  router: Router = inject(Router);

  loginForm = new FormGroup({
    loginId: new FormControl('')
  })

  constructor() { }

  doLogin() {
    this.sessionService.loggedInUser = this.loginForm.value.loginId ?? '';
    this.router.navigate(['/forum'])
  }

}
