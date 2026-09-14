import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  channelNames: string[] = [];
  articleCounts: { [channelName: string]: number } = {};
  lastUpdatedDates: { [channelName: string]: string } = {};
  pageSize: number = 15;
  currentPage: number = 0;

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit() {
    this.fetchChannelNames();
  }

  fetchChannelNames() {
    this.articleService.getAllChannelNames().subscribe(
      (channelNames: string[]) => {
        this.channelNames = channelNames;
        this.fetchArticleCountsAndLastUpdatedDates();
      },
      (error: any) => {
        console.error(error);
      },
    );
  }

  fetchArticleCountsAndLastUpdatedDates() {
    this.channelNames.forEach((channelName: string) => {
      this.articleService.countUrlsByChannel(channelName).subscribe(
        (count: number) => {
          this.articleCounts[channelName] = count;
        },
        (error: any) => {
          console.error(error);
        },
      );

      this.articleService.latestArticleByChannel(channelName).subscribe(
        (response: any) => {
          const lastUpdatedDate: string = response.lastUpdatedDate;
          this.lastUpdatedDates[channelName] = lastUpdatedDate;
        },
        (error: any) => {
          console.error(error);
        },
      );
    });
  }

  redirectToURLList(channelName: string) {
    this.router.navigate(['/article-list'], {
      queryParams: { channelName: channelName },
    });
  }
  
  getArticleCount(channelName: string): number {
    return this.articleCounts[channelName] || 0;
  }
  
  getCurrentPageChannels(): string[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.channelNames.slice(startIndex, startIndex + this.pageSize);
  }
  
  onPageChange(pageIndex: number) {
    this.currentPage = pageIndex;
  }

  getFormattedDate(channelName: string): string {
    const dateString = this.lastUpdatedDates[channelName];
    return this.formatDate(dateString);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString;
    }

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    return date.toLocaleString('en-US', options);
  }

}
