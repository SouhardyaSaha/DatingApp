import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from "./components/lists/lists.component";
import { AuthGuard } from "../auth/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: ListsComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }
