import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPopupComponent } from './admin-popup.component';

describe('AdminPopupComponent', () => {
  let component: AdminPopupComponent;
  let fixture: ComponentFixture<AdminPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPopupComponent],
    });
    fixture = TestBed.createComponent(AdminPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
