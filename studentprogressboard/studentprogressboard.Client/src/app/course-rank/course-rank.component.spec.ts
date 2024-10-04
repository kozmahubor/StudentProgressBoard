import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseRankComponent } from './course-rank.component';

describe('CourseRankComponent', () => {
  let component: CourseRankComponent;
  let fixture: ComponentFixture<CourseRankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseRankComponent]
    });
    fixture = TestBed.createComponent(CourseRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
