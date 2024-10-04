import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticRouteTrainingsComponent } from './statistic-route-trainings.component';

describe('StatisticRouteTrainingsComponent', () => {
  let component: StatisticRouteTrainingsComponent;
  let fixture: ComponentFixture<StatisticRouteTrainingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticRouteTrainingsComponent]
    });
    fixture = TestBed.createComponent(StatisticRouteTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
