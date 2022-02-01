import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MemberModel } from "../../../../shared/models/member.model";
import { UserModel } from "../../../../shared/models/user.model";
import { MembersService } from "../../services/members.service";
import { AuthService } from "../../../auth/services/auth.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { take } from "rxjs";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm | undefined;
  member: MemberModel | null = null;
  user: UserModel | null = null;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm && this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private authService: AuthService, private memberService: MembersService,
              private notificationService: NotificationService) {
    this.authService.user$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  private loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.userName).subscribe(member => {
      this.member = member;
    })
  }

  updateMember() {
    if(!this.member) return;
    this.memberService.updateMember(this.member).subscribe(() => {
      this.notificationService.success('Profile updated successfully');
      if (this.editForm) this.editForm.reset(this.member);
    })
  }
}
