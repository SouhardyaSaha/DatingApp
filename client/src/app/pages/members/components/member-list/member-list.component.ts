import { Component, OnInit } from '@angular/core';
import { MemberModel } from "../../../../shared/models/member.model";
import { MembersService } from "../../services/members.service";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members: MemberModel[] | undefined;

  constructor(private memberService: MembersService) {
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  private loadMembers() {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    })
  }
}
