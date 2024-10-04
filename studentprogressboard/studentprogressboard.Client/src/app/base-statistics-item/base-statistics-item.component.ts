import { Component, Input } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-base-statistics-item',
  templateUrl: './base-statistics-item.component.html',
  styleUrls: ['./base-statistics-item.component.scss']
})
export class BaseStatisticsItemComponent {
  @Input() route: string;
  @Input() name: string;

  constructor(private router: Router) {}

  navigateToRoute(): void {
    this.router.navigate([this.route]);
  }
}
