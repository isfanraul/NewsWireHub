import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Sitemap } from '../models/sitemap.model';
import { Router } from '@angular/router';
import { SitemapRequest } from '../models/sitemap-request.model';
import { MatDialog } from '@angular/material/dialog';
import { AddSitemapDialogComponent } from '../add-sitemap-dialog/add-sitemap-dialog.component';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-sitemap-list',
  templateUrl: './sitemap-list.component.html',
  styleUrls: ['./sitemap-list.component.css'],
})
export class SitemapListComponent implements OnInit {
  channelSitemaps: Sitemap[] = [];
  pageSize: number = 12;
  currentPage: number = 0;

  constructor(private articleService: ArticleService, private router: Router, private dialog: MatDialog, private authService: AuthService ) {}

  ngOnInit() {
    this.fetchChannelSitemaps();
  }

  fetchChannelSitemaps() {
    this.articleService.getAllSitemaps().subscribe(
      (sitemaps: Sitemap[]) => {
        this.channelSitemaps = sitemaps;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  addSitemap(loc: string, channel: string) {
    const sitemapRequest: SitemapRequest = {
      loc: loc,
      channel: channel,
    };
    this.articleService.addSitemap(sitemapRequest).subscribe(
      (sitemap: Sitemap) => {
        console.log('Sitemap added:', sitemap);
        this.fetchChannelSitemaps(); 
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  deleteSitemap(loc: string) {
    this.articleService.deleteSitemap(loc).subscribe(
      () => {
        console.log('Sitemap deleted:', loc);
        this.fetchChannelSitemaps(); 
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  navigateToUrlFromSitemap(loc: string) {
    this.router.navigate(['/articlefromsitemap'], {
      queryParams: { loc: loc },
    });
  }

  openSitemapInNewTab(url: string) {
    window.open(url, '_blank');
  }

  getCurrentPageSitemaps(): Sitemap[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.channelSitemaps.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(pageIndex: number): void {
    this.currentPage = pageIndex;
  }

  openAddSitemapDialog() {
    const dialogRef = this.dialog.open(AddSitemapDialogComponent, {
      width: '400px',
      data: { loc: '', channel: '' } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addSitemap(result.loc, result.channel);
      }
    });
  }

  isAdmin(): boolean {
    const role = this.authService.loggedUser?.role;
    return role === 'ADMINISTRATOR';
  }
  
}
