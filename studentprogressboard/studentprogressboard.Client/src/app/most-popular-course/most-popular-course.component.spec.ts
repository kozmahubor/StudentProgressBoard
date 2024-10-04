import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularCourseComponent } from './most-popular-course.component';

describe('MostPopularCourseComponent', () => {
  let component: MostPopularCourseComponent;
  let fixture: ComponentFixture<MostPopularCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostPopularCourseComponent]
    });
    fixture = TestBed.createComponent(MostPopularCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
