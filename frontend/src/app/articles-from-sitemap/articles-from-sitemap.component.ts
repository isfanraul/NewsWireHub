import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';

@Component({
  standalone: false,
  selector: 'app-articles-from-sitemap',
  templateUrl: './articles-from-sitemap.component.html',
  styleUrls: ['./articles-from-sitemap.component.css'],
})
export class ArticlesFromSitemapComponent implements OnInit {
  articles: Article[] = [];
  pageSize: number = 13;
  currentPage: number = 0;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const loc = params['loc'];
      if (loc) {
        this.fetchArticlesFromSitemap(loc);
      }
    });
  }

  fetchArticlesFromSitemap(sitemapLoc: string) {
    this.articleService.getUrlNews(sitemapLoc).subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      },
      (error: any) => {
        console.error(error);
      },
    );
  }

  openUrlInNewTab(url: string) {
    window.open(url, '_blank');
  }

  getCurrentPageArticles(): Article[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.articles.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(pageIndex: number) {
    this.currentPage = pageIndex;
  }
}
