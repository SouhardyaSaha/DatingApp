import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  authenticationForm: FormGroup = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6),]],
  });

  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.isLoading = true
    this.authService.register(this.authenticationForm.value).subscribe(
      res => {
        console.log(res)
        this.isLoading = false
      },
      error => {
        console.log(error)
        this.isLoading = false
      }
    )
  }

}
