import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-custom-text-box',
  styleUrls: ['./custom-text-box.component.scss'],
  template: `
  <input type="text" [value]="value" [disabled]="disabled" (change)="onChange($event.target.value)" (keyup)="onChange($event.target.value)">
  <button (click)="increment()">+</button>
  <button (click)="decrement()">-</button>

  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomTextBoxComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomTextBoxComponent),
      multi: true,
    }
  ]
})
export class CustomTextBoxComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() disabled: boolean;
  _value: string = null;
  private data: string;
  constructor() { }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.propagateChange(this._value);
  }

  ngOnInit() {
  }

  propagateChange = (_: any) => { };

  // !!! ControlValueAccessor
  // Allow Angular to set the value on the component
  // Allows Angular to update the model.
  // Update the model and changes needed for the view here.
  writeValue(value: string): void {
    this.value = value;
  }

  // Save a reference to the change function passed to us by
  // the Angular form control
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  // Save a reference to the touched function passed to us by
  // the Angular form controlInput
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // Allow the Angular form control to disable this input
  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  increment(): void {
    this.value = '+';
  }

  decrement(): void {
    this.value = '-';
  }

  // !!! VALIDATOR
  // validates the form, returns null when valid, else the validation object
  validate(control: AbstractControl): ValidationErrors {
    const validate: ValidationErrors = this.value === 'hello' ? null : {
      notMatchError: true
    }
    console.log(control.errors);
    return validate;
  }

  onChange = (value: string) => {
    this.value = value;
  };

  private onTouch = () => { };
}
