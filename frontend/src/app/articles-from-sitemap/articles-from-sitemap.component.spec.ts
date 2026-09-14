import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesFromSitemapComponent } from './articles-from-sitemap.component';

describe('ArticlesFromSitemapComponent', () => {
  let component: ArticlesFromSitemapComponent;
  let fixture: ComponentFixture<ArticlesFromSitemapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesFromSitemapComponent],
    });
    fixture = TestBed.createComponent(ArticlesFromSitemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
