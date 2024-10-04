import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
@Component({
  selector: 'app-core-main',
  styleUrls: ['main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <main>
      <app-side-nav-bar>
        <ng-content></ng-content>
      </app-side-nav-bar>
    </main>
  `,
})
export class MainComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  opened = true;

  menuVariable = true;
  menu_icon_variable = false;

  private _mobileQueryListener: () => void;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1910px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }
}
