import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { ArticleEditPopupComponent } from '../article-edit-popup/article-edit-popup.component';

@Component({
  standalone: false,
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | undefined;
  formattedDate: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const loc = params['id'];
      this.articleService.getArticle(loc).subscribe(
        (article: Article) => {
          this.article = article;
          this.formatDate();
        },
        (error: any) => {
          console.error('Failed to fetch article details:', error);
        },
      );
    });
  }

  formatDate() {
    if (this.article?.lastmod) {
      const date = new Date(this.article.lastmod);

      if (isNaN(date.getTime())) {
        this.formattedDate = this.article.lastmod;
      } else {
        const options: Intl.DateTimeFormatOptions = {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        };

        this.formattedDate = date.toLocaleString('en-US', options);
      }
    }
  }

  editArticle() {
    const dialogRef = this.dialog.open(ArticleEditPopupComponent, {
      width: '600px',
      data: this.article,
    });

    dialogRef.afterClosed().subscribe((result: Article) => {
      if (result) {
        this.article = result;
      }
    });
  }
}
