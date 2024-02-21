import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ag-registration',
  templateUrl: './ag-registration.component.html',
  styleUrls: ['./ag-registration.component.css']
})
export class AgRegistrationComponent implements OnChanges, OnInit {

  registerForm: FormGroup;
  submitted = false;
  userSkills: any;
  @Input() rowValue: any;
  @Output() regFormValue = new EventEmitter<{selected: any, data: any }>();
  @Input() actionSelected: any;
  @ViewChild('closebutton') closebutton;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      userEmail: ["", [Validators.required, Validators.email]],
      userPassword: ["", [Validators.required, Validators.minLength(6)]],
      age: ["", [Validators.required, Validators.maxLength(2)]],
      skillsNeeded: [this.rowValue?.skillsNeeded, Validators.required],
    });

    this.userSkills = ['Angular', 'React', 'Java', 'Python', 'Ruby'];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && (this.rowValue != undefined) && this.actionSelected === 'edit' ) {
      this.setRowValuesInForm();
    } else {
      this.registerForm.reset();
      this.registerForm.markAsUntouched();
      this.registerForm.clearValidators();
      this.registerForm.updateValueAndValidity();
      this.registerForm.removeValidators;
    }
  }

  ngOnInit(): void {

  }

  setRowValuesInForm() {
    this.registerForm.get("firstName").patchValue(this.rowValue.firstName);
    this.registerForm.get("lastName").patchValue(this.rowValue.lastName);
    this.registerForm.get("userEmail").patchValue(this.rowValue.userEmail);
    this.registerForm.get("userPassword").patchValue(this.rowValue.userPassword);
    this.registerForm.get("age").patchValue(this.rowValue.age);
    this.registerForm.get("skillsNeeded").patchValue(this.rowValue.skillsNeeded);
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.regFormValue.emit({selected : this.actionSelected, data: this.registerForm.value})
    // this.closebutton.nativeElement.click();
  }

  reset() {
    this.submitted = false; 
    this.registerForm.reset();
  }
}
