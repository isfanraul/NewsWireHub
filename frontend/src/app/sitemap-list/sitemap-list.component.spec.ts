import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapListComponent } from './sitemap-list.component';

describe('SitemapListComponent', () => {
  let component: SitemapListComponent;
  let fixture: ComponentFixture<SitemapListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SitemapListComponent],
    });
    fixture = TestBed.createComponent(SitemapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
