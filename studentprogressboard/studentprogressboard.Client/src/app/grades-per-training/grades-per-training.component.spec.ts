import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesPerTrainingComponent } from './grades-per-training.component';

describe('GradesPerTrainingComponent', () => {
  let component: GradesPerTrainingComponent;
  let fixture: ComponentFixture<GradesPerTrainingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradesPerTrainingComponent]
    });
    fixture = TestBed.createComponent(GradesPerTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
