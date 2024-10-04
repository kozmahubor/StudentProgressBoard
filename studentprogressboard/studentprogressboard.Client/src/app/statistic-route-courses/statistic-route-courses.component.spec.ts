import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticRouteCoursesComponent } from './statistic-route-courses.component';

describe('StatisticRouteCoursesComponent', () => {
  let component: StatisticRouteCoursesComponent;
  let fixture: ComponentFixture<StatisticRouteCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticRouteCoursesComponent]
    });
    fixture = TestBed.createComponent(StatisticRouteCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
