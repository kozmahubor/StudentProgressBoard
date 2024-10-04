import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseStatisticsItemComponent } from './base-statistics-item.component';

describe('BaseStatisticsItemComponent', () => {
  let component: BaseStatisticsItemComponent;
  let fixture: ComponentFixture<BaseStatisticsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseStatisticsItemComponent]
    });
    fixture = TestBed.createComponent(BaseStatisticsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
