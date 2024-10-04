import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-button',
  styleUrls: ['shared-button.component.scss'],
  template: ` <button [class]="getClassList()">{{ text }}</button> `,
})
export class SharedButtonComponent {
  @Input() text: string = '';
  @Input() type: 'filled' | 'outlined' = 'filled';
  @Input() classLayer: string = '';

  getClassList(): string {
    return [this.type, this.classLayer].join(' ');
  }
}
