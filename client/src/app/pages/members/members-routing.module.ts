import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from "./components/member-list/member-list.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { MemberDetailComponent } from "./components/member-detail/member-detail.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: 'full',
    redirectTo: "/member/list"
  },
  {
    path: "list",
    canActivate: [AuthGuard],
    component: MemberListComponent
  },
  {
    path: ":username",
    canActivate: [AuthGuard],
    component: MemberDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule {
}
