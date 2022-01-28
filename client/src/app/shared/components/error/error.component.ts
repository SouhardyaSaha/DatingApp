import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  statusCode: number = 500
  errorText: string = 'Something Went Wrong'

  constructor(private router: Router, private route: ActivatedRoute) {
    // const currentNavigation = this.router.getCurrentNavigation()
    // const error = currentNavigation?.extras?.state?.['error']

  }

  ngOnInit(): void {
    const state = history.state
    const error = state?.['error']
    this.statusCode = error?.status ? error.status : 500
  }

}
