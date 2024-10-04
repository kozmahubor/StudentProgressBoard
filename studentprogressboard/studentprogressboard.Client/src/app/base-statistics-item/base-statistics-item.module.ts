import {NgModule} from "@angular/core";
import {SideNavBarComponent} from "../core/components/side-nav-bar/side-nav-bar.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {BaseStatisticsItemComponent} from "./base-statistics-item.component";

@NgModule({
  declarations: [BaseStatisticsItemComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [BaseStatisticsItemComponent],
})

export class BaseStatisticsItemModule {}
