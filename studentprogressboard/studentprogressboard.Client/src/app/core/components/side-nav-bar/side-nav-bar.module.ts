import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {SideNavBarComponent} from "./side-nav-bar.component";
import {MatIconModule} from "@angular/material/icon";
import {AppRoutingModule} from "../../../app-routing.module";
import {MainModule} from "../main/main.module";
import {NavBarModule} from "../nav-bar/nav-bar.module";
import {MatDialogModule} from "@angular/material/dialog";
import {SharedPageButtonModule} from "../../../shared/components/buttons/shared-page-button/shared-page-button.module";
import {SharedButtonModule} from "../../../shared/components/buttons/shared-button/shared-button.module";
import {BaseStatisticsItemModule} from "../../../base-statistics-item/base-statistics-item.module";
@NgModule({
  declarations: [SideNavBarComponent],
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    SharedPageButtonModule,
    SharedButtonModule,
    BaseStatisticsItemModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [SideNavBarComponent],
})

export class SideNavBarModule {}
