import { Component, OnInit } from '@angular/core';
import { AuthService } from "./pages/auth/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationService } from "./shared/services/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DatingApp';

  constructor(
    private authService: AuthService,
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.authService.autoLogin()
  }

  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 0,
      panelClass: [className]
    });
  }

  showAlert() {
    this.notificationService.alert("an alert", "notice", () => {
      this.notificationService.success("alert poked");
    });
  }

  showConfirm() {
    this.notificationService.confirmation("it will be gone forever", () => {
        this.notificationService.success("confirm poked");
      },
      'Are you sure?',
      () => {
        this.notificationService.error("confirm canceled");
      });
  }
}
