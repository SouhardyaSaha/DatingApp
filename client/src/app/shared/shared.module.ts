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
import { TextInputComponent } from './library/text-input/text-input.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DateInputComponent } from "./library/date-input/date-input.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";


@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmationDialog,
    AlertDialog,
    ErrorComponent,
    TextInputComponent,
    DateInputComponent
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
    NgxSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  exports: [
    HeaderComponent,
    ConfirmationDialog,
    AlertDialog,
    TabsModule,
    NgxGalleryModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    TextInputComponent,
    DateInputComponent,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SharedModule {
}
