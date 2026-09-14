import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { Sitemap } from '../models/sitemap.model';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredArticles: Article[] = [];
  totalArticles: number = 0;
  totalChannels: number = 0;
  totalSitemaps: number = 0;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.fetchFeaturedArticles();
    this.fetchStatistics();
  }

  fetchFeaturedArticles() {
    this.articleService.getAllArticlesByChannel('featured').subscribe(
      (articles: Article[]) => {
        this.featuredArticles = articles;
        console.log('Featured Articles:', this.featuredArticles);
      },
      (error: any) => {
        console.error(error);
      },
    );
  }

  fetchStatistics() {
    this.articleService.getAllChannelNames().subscribe(
      (channelNames: string[]) => {
        this.totalChannels = channelNames.length;
        console.log('Total Channels:', this.totalChannels);
      },
      (error: any) => {
        console.error(error);
      },
    );

    this.articleService.getAllArticles().subscribe(
      (articles: Article[]) => {
        this.totalArticles = articles.length;
        console.log('Total Articles:', this.totalArticles);
      },
      (error: any) => {
        console.error(error);
      },
    );

    this.articleService.getAllSitemaps().subscribe(
      (sitemaps: Sitemap[]) => {
        this.totalSitemaps = sitemaps.length;
        console.log('Total Sitemaps:', this.totalSitemaps);
      },
      (error: any) => {
        console.error(error);
      },
    );
  }
}
