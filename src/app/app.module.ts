import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgRegistrationComponent } from './ag-registration/ag-registration.component';



@NgModule({
  imports: [BrowserModule, FormsModule, AgGridModule, BrowserAnimationsModule, ReactiveFormsModule,],
  declarations: [AppComponent, ActionButtonsComponent, AgRegistrationComponent],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ],
})
export class AppModule {}
