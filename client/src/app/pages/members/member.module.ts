import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { SharedModule } from "../../shared/shared.module";
import { MatIconModule } from "@angular/material/icon";
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailComponent,
    MemberCardComponent,
    MemberEditComponent
  ],
    imports: [
        CommonModule,
        MembersRoutingModule,
        SharedModule,
        MatIconModule,
        FormsModule
    ]
})
export class MemberModule { }
