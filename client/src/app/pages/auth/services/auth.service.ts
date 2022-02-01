import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthReqModel } from "../models/auth-req.model";
import { UserModel } from "../../../shared/models/user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = environment.baseURL
  public user$: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null)

  constructor(private http: HttpClient, private router:Router) {
  }

  public login(body: AuthReqModel): Observable<UserModel> {
    let url = this.baseURL + "/auth/login"
    return this.http.post<UserModel>(url, body).pipe(
      tap(user => {
        this.authenticateUser(user)
      })
    )
  }

  public register(body: AuthReqModel): Observable<UserModel> {
    let url = this.baseURL + "/auth/register"
    return this.http.post<UserModel>(url, body).pipe(
      tap(user => {
        this.authenticateUser(user)
      })
    )
  }

  public autoLogin() {
    let user: UserModel | null = null
    let data: string | null = localStorage.getItem('user')
    if (data) {
      user = JSON.parse(data)
      this.user$.next(user)
    }
  }

  public logout() {
    localStorage.removeItem('user')
    this.user$.next(null)
  }


  private authenticateUser(user: UserModel) {
    localStorage.setItem("user", JSON.stringify(user))
    this.user$.next(user)
    this.router.navigate(['/member'])
  }
}
