import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { SharedModule } from "../../shared/shared.module";
import { MatIconModule } from "@angular/material/icon";
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PhotoEditorComponent } from './components/photo-editor/photo-editor.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from "@angular/material/button";
import { NgxFileDropModule } from "ngx-file-drop";


@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent
  ],
    imports: [
        CommonModule,
        MembersRoutingModule,
        SharedModule,
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatButtonModule,
        NgxFileDropModule,
        ReactiveFormsModule
    ]
})
export class MemberModule { }
