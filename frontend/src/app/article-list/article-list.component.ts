import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit, AfterViewInit {
  channelName: string = '';
  articles: Article[] = [];
  pageSize: number = 10;
  currentPage: number = 0;
  totalItems: number = 0;
  dataSource!: MatTableDataSource<Article>;
  displayedColumns: string[] = ['thumbnail', 'title', 'actions'];
  selectedArticle: Article | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private dialog: MatDialog,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['channelName']) {
        this.channelName = params['channelName'];
        this.loadArticles();
      }
    });

    const storedArticle = localStorage.getItem('selectedArticle');
    if (storedArticle) {
      this.selectedArticle = JSON.parse(storedArticle);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadArticles();
  }

  viewArticleDetails(article: Article) {
    this.selectedArticle = article;
    localStorage.setItem('selectedArticle', JSON.stringify(article));
    if (this.selectedArticle === article) {
      this.router.navigate(['/article-details', article.loc]);
    }
  }

  deleteArticle(article: Article) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure you want to delete this article?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        console.log('Delete Article:', article);

        this.articleService.deleteArticle(article.loc).subscribe(
          (response: string) => {
            console.log('Article deleted successfully:', response);
            this.loadArticles();
            this.paginator.firstPage();
          },
          (error: any) => {
            console.error('Failed to delete Article:', error);
          },
        );
      }
    });
  }

  loadArticles() {
    this.currentPage = 0;
    const startIndex = this.currentPage * this.pageSize;
    this.articleService.getAllArticlesByChannel(this.channelName).subscribe(
      (articles: Article[]) => {
        this.articles = articles;
        this.totalItems = this.articles.length;
        this.dataSource = new MatTableDataSource(
          this.articles.slice(startIndex, startIndex + this.pageSize),
        );
      },
      (error: any) => {
        console.error('Failed to load articles:', error);
      },
    );
  }

  handlePageChange(event: any) {
    this.currentPage = event.pageIndex;
    const startIndex = this.currentPage * this.pageSize;
    this.dataSource.data = this.articles.slice(
      startIndex,
      startIndex + this.pageSize,
    );
  }

  isEditorOrAdmin(): boolean {
    const role = this.authService.loggedUser?.role;
    return role === 'ADMINISTRATOR' || role === 'EDITOR';
  }
}
