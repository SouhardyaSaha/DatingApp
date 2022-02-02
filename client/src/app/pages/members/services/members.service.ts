import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { MemberModel } from "../../../shared/models/member.model";
import { Observable, of, tap } from "rxjs";
import { Photo } from "../../../shared/models/photo";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private baseUrl = environment.baseURL;
  private members: MemberModel[] = []

  constructor(private http: HttpClient) {
  }

  public getMembers(): Observable<MemberModel[]> {
    if (this.members.length > 0) return of(this.members.slice());
    return this.http.get<MemberModel[]>(this.baseUrl + '/users').pipe(
      tap(res => {
        this.members = res
      })
    );
  }

  public getMember(username: string): Observable<MemberModel> {
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) return of(member);

    return this.http.get<MemberModel>(this.baseUrl + '/users/' + username);
  }

  public updateMember(member: MemberModel) {
    return this.http.put<MemberModel>(this.baseUrl + '/users/', member).pipe(
      tap(() => {
        const index = this.members.indexOf(member)
        this.members[index] = member;
      })
    );
  }

  public uploadPhoto(file: File, username: string) {
    const formData = new FormData()
    formData.append("file", file)
    return this.http.post<Photo>(this.baseUrl + '/users/add-photo', formData).pipe(
      tap((res) => {
        this.members.forEach(member => {
          if (member.username === username) {
            member.photos.concat(res)
            return;
          }
        })
      })
    );
  }
}
