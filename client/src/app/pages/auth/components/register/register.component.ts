import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  authenticationForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6),]],
  });

  isLoading: boolean = false;

  constructor(private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.isLoading = true
    console.log(this.authenticationForm)
  }

}
