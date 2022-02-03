import { Component, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = 'Date'
  @Input() placeholder: string = 'Choose A Date'
  @Input() maxDate: Date = new Date()

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }
}
