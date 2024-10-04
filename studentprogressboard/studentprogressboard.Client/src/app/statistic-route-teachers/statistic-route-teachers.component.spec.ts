import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticRouteTeachersComponent } from './statistic-route-teachers.component';

describe('StatisticRouteTeachersComponent', () => {
  let component: StatisticRouteTeachersComponent;
  let fixture: ComponentFixture<StatisticRouteTeachersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticRouteTeachersComponent]
    });
    fixture = TestBed.createComponent(StatisticRouteTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
