import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HeaderComponent} from "./components/header/header.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatMenuModule} from "@angular/material/menu";
import {RouterModule} from "@angular/router";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  exports: [HeaderComponent]
})
export class SharedModule {
}
