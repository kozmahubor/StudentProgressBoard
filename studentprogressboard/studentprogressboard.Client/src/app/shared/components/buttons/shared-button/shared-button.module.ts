import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedButtonComponent} from "./shared-button.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [SharedButtonComponent],
  imports: [CommonModule, BrowserAnimationsModule, FormsModule], // Add BrowserAnimationsModule and FormsModule here
  providers: [],
  bootstrap: [],
  exports: [SharedButtonComponent],
})
export class SharedButtonModule {}
