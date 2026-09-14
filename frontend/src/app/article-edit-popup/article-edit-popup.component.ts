import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { NotificationService } from '../services/notification.service';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  standalone: false,
  selector: 'app-article-edit-popup',
  templateUrl: './article-edit-popup.component.html',
  styleUrls: ['./article-edit-popup.component.css'],
})
export class ArticleEditPopupComponent implements OnInit {
  article: Article = new Article();
  cancelClicked: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ArticleEditPopupComponent>,
    private articleService: ArticleService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: Article,
  ) {}

  ngOnInit() {
    this.articleService.getArticle(this.data.loc).subscribe(
      (article: Article) => {
        this.article = article;
      },
      (error: any) => {
        console.error('Failed to fetch article details:', error);
      },
    );
  }

  submitForm() {
    this.articleService.updateArticle(this.article).subscribe(
      (response: string) => {
        console.log('API Response:', response);
        console.log('Article updated successfully:', response);

        if (!this.cancelClicked) {
          this.notificationService.showSuccess('Article updated successfully');
        }

        this.dialogRef.close(this.article);
      },
      (error: any) => {
        console.error('Failed to update article:', error);
        this.notificationService.showError('Failed to update article');
      },
    );
  }

  cancel() {
    this.cancelClicked = true;
    this.dialogRef.close();
  }
}
