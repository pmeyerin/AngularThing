import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private USER_KEY = "loggedInUser";
  constructor() { }

  get loggedInUser(): string {
    return sessionStorage.getItem(this.USER_KEY) ?? '';
  }

  set loggedInUser(value: string) {
    sessionStorage.setItem(this.USER_KEY, value);
    console.log(`Logged in as ${sessionStorage.getItem(this.USER_KEY)}`);
  }

  isLoggedIn(): boolean {
    const sessionUser = sessionStorage.getItem(this.USER_KEY) ?? '';
    return sessionUser.length > 0;
  }
}
