import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageCreditOrganizationComponent } from './average-credit-organization.component';

describe('AverageCreditOrganizationComponent', () => {
  let component: AverageCreditOrganizationComponent;
  let fixture: ComponentFixture<AverageCreditOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AverageCreditOrganizationComponent]
    });
    fixture = TestBed.createComponent(AverageCreditOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
