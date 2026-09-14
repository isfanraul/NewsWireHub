import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleEditPopupComponent } from './article-edit-popup.component';

describe('ArticleEditPopupComponent', () => {
  let component: ArticleEditPopupComponent;
  let fixture: ComponentFixture<ArticleEditPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleEditPopupComponent],
    });
    fixture = TestBed.createComponent(ArticleEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
