import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthResponseModel } from "../models/auth-response.model";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthReqModel } from "../models/auth-req.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL:string = environment.baseURL

  constructor(private http: HttpClient) { }

  public login(body: AuthReqModel) : Observable<AuthResponseModel> {
    let url = this.baseURL + "/auth/login"
    return this.http.post<AuthResponseModel>(url, body)
  }

}
