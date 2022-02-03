import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { CrossFieldErrorMatcher } from "../../utils/errorStateMatcher";
import { NotificationService } from "../../../../shared/services/notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  crossFieldErrorMatcher = new CrossFieldErrorMatcher()
  authenticationForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit() {
    console.log(this.authenticationForm)
    this.authService.register(this.authenticationForm.value).subscribe(
      () => {
        this.notificationService.success("Registration Successful")
      }
    )
  }

  private initForm() {
    this.authenticationForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: [""]
    }, {validators: this.checkPasswords});

    // this.authenticationForm.controls['password'].valueChanges.subscribe(() => {
    //     this.authenticationForm.controls["confirmPassword"].updateValueAndValidity()
    //   }
    // )
  }

  private checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass ? null : {misMatch: true}
  }
}
