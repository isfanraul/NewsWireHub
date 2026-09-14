import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSitemapDialogComponent } from './add-sitemap-dialog.component';

describe('AddSitemapDialogComponent', () => {
  let component: AddSitemapDialogComponent;
  let fixture: ComponentFixture<AddSitemapDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSitemapDialogComponent]
    });
    fixture = TestBed.createComponent(AddSitemapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
