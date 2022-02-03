import { Component, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = 'NO_LABEL'
  @Input() placeholder: string = 'NO_PLACEHOLDER'
  @Input() type: string = 'text'
  @Input() matcher: ErrorStateMatcher = new ErrorStateMatcher()

  @ViewChild('inputElement') input: any

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this
  }

  ngOnInit(): void {
    // if (this.matcher) {
    //   this.input.errorStateMatcher = this.matcher
    // }
  }


  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

  // constructor(@Self() ) { }


}
