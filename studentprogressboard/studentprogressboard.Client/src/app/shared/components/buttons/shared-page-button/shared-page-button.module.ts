import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { FormsModule } from '@angular/forms'; // Import FormsModule if you're using Angular forms
import { SharedPageButtonComponent } from './shared-page-button.component';

@NgModule({
  declarations: [SharedPageButtonComponent],
  imports: [CommonModule, BrowserAnimationsModule, FormsModule], // Add BrowserAnimationsModule and FormsModule here
  providers: [],
  bootstrap: [],
  exports: [SharedPageButtonComponent],
})
export class SharedPageButtonModule {}
