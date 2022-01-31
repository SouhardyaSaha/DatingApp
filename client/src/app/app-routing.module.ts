import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "member",
    loadChildren: () => import('./pages/members/member.module').then(m => m.MemberModule)
  },
  {
    path: "messages",
    loadChildren: () => import('./pages/messages/messages.module').then(m => m.MessagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
