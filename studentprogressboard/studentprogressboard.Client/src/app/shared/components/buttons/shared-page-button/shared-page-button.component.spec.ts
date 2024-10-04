import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPageButtonComponent } from './shared-page-button.component';

describe('SharedPageButtonComponent', () => {
  let component: SharedPageButtonComponent;
  let fixture: ComponentFixture<SharedPageButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedPageButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SharedPageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
