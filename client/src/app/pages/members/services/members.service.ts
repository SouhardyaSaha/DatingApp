import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { MemberModel } from "../../../shared/models/member.model";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.baseURL;

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<MemberModel[]>(this.baseUrl + '/users');
  }

  getMember(username: string) {
    return this.http.get<MemberModel>(this.baseUrl + '/users/' + username);
  }
}
