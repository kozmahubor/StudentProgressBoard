import {ChangeDetectorRef, Component, HostListener, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import {AdminGuard} from "../../../AdminGuard";

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  opened = true;

  menuVariable = true;
  menu_icon_variable = false;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
      event: KeyboardEvent
  ) {
    event.preventDefault(); // Prevent the default action of closing the side-navbar
  }

  private _mobileQueryListener: () => void;
  constructor(
      private dialog: MatDialog,
      changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      public router: Router,
      public apiService: ApiService,
      private adminGuard: AdminGuard
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 10100px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  isDropdownOpen: boolean = false;
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  isAdmin(): boolean {
    return this.adminGuard.isAdmin();
  }
}

