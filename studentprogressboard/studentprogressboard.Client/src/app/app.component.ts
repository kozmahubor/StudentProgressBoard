import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <app-core-main  >
      <router-outlet></router-outlet>
    </app-core-main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'studentprogressboard.Client';
  currentPage: string = '';
  routerSubscription: Subscription | undefined;
  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.routerState.snapshot.root.firstChild?.data['backgroundClass'];
        if (currentRoute) {
          const bodyClasses = document.body.classList;
          bodyClasses.forEach(className => {
            if (className.startsWith('background')) {
              bodyClasses.remove(className);
            }
          });
          this.renderer.addClass(document.body, currentRoute);
        }
      }
    });
  }
  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  protected readonly open = open;
}
