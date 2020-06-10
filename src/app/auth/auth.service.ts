import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _userAuthenticated = true;
  private _userId = "xyz";
  get userAuthenticated() {
    return this._userAuthenticated;
  }
  get userId() {
    return this._userId;
  }
  constructor() {}
  login() {
    this._userAuthenticated = true;
  }
  logout() {
    this._userAuthenticated = false;
  }
}
