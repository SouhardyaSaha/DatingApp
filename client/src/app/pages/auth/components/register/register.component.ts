import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
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
  maxDate: Date = new Date()

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.initForm()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onSubmit() {
    // console.log(this.authenticationForm)
    this.authService.register(this.authenticationForm.value).subscribe(
      () => {
        this.notificationService.success("Registration Successful")
      }
    )
  }

  private checkMatch = (matchTo: string): ValidatorFn => {
    return control => {
      let pass = control.parent?.get(matchTo)?.value
      let confirmPass = control.value
      return (pass && confirmPass) && pass === confirmPass ? null : {misMatch: true}
    }
  }

  private initForm() {
    this.authenticationForm = this.fb.group({
      username: ["", [Validators.required]],
      dateOfBirth: ["", [Validators.required]],
      knownAs: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      city: ["", [Validators.required]],
      country: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", this.checkMatch('password')]
    })

    this.authenticationForm.controls['password'].valueChanges.subscribe(() => {
        this.authenticationForm.controls["confirmPassword"].updateValueAndValidity()
      }
    )
  }
}
