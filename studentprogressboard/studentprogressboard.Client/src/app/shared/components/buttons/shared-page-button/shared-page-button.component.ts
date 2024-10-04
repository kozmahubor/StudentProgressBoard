import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-page-button',
  styleUrls: ['shared-page-button.component.scss'],
  template: ` <button [class]="getClassList()">{{ text }}</button> `,
})
export class SharedPageButtonComponent {
  @Input() text: string = '';
  @Input() type: 'filled' | 'outlined' = 'filled';
  @Input() classLayer: string = '';

  getClassList(): string {
    return [this.type, this.classLayer].join(' ');
  }
}
