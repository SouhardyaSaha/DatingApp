import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";
import { HeaderComponent } from "./components/header/header.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ErrorComponent } from './components/error/error.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { AlertDialog, ConfirmationDialog } from "./services/notification.service";
import { ErrorsInterceptor } from "./interceptors/errors.interceptor";
import { TabsModule } from "ngx-bootstrap/tabs";
import { NgxGalleryModule } from "@kolkov/ngx-gallery";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { LoadingInterceptor } from "./interceptors/loading.interceptor";
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmationDialog,
    AlertDialog,
    ErrorComponent
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
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    TabsModule.forRoot(),
    NgxGalleryModule,
    FontAwesomeModule,
    NgxSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    // {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  exports: [
    HeaderComponent,
    ConfirmationDialog,
    AlertDialog,
    TabsModule,
    NgxGalleryModule,
    FontAwesomeModule,
    NgxSpinnerModule
  ]
})
export class SharedModule {
}
