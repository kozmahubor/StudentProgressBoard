import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticRouteStudentsComponent } from './statistic-route-students.component';

describe('StatisticRouteStudentsComponent', () => {
  let component: StatisticRouteStudentsComponent;
  let fixture: ComponentFixture<StatisticRouteStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticRouteStudentsComponent]
    });
    fixture = TestBed.createComponent(StatisticRouteStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
