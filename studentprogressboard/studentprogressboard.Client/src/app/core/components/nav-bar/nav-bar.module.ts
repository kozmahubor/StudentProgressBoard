import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NavBarComponent} from "./nav-bar.component";
import {MatIconModule} from "@angular/material/icon";
import {SharedPageButtonModule} from "../../../shared/components/buttons/shared-page-button/shared-page-button.module";
import {SharedButtonModule} from "../../../shared/components/buttons/shared-button/shared-button.module";

@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, RouterModule, MatIconModule, SharedPageButtonModule, SharedButtonModule ],
  providers: [],
  bootstrap: [],
  exports: [NavBarComponent],
})
export class NavBarModule {}
