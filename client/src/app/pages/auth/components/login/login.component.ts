import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authenticationForm: FormGroup = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6),]],
  });

  isLoading: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true
    this.authService.login(this.authenticationForm.value).subscribe(
      () => {
        this.isLoading = false
      },
      () => {
        this.isLoading = false
      }
    )
  }
}
