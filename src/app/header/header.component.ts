import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import {SessionService} from "../session.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <header class="header">
      <div>
        <a routerLink="/">
          Home
        </a>
      </div>
      <div>
        <a class="nav-link" routerLink="/forum">Forum</a>
        <a class="nav-link" routerLink="/login" *ngIf="!sessionService.isLoggedIn()">Login</a>
        <a class="nav-link" routerLink="/login" (click)="sessionService.loggedInUser=''" *ngIf="sessionService.isLoggedIn()">Logout({{sessionService.loggedInUser}})</a>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  sessionService: SessionService = inject(SessionService);
  constructor() { }

}
