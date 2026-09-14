import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../services/article.service';
import { ArticleRequest } from '../models/article-request.model';
import { NotificationService } from '../services/notification.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css'],
})
export class ArticleCreateComponent implements OnInit {
  articleForm: FormGroup;
  notificationMessage: string = '';
  private loggedUser: User | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {
    this.articleForm = this.formBuilder.group({
      loc: ['', Validators.required],
      lastmod: ['', Validators.required],
      channelName: ['', Validators.required],
      description: ['', Validators.required],
      thumbnail: ['', Validators.required],
      title: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loggedUser = this.authService.loggedUser;
  }

  onSubmit(): void {
    if (this.articleForm.invalid) {
      return;
    }

    const newArticle: ArticleRequest = this.articleForm.value;
    newArticle.user = this.loggedUser?.username;

    this.articleService.addArticle(newArticle).subscribe(
      (response) => {
        this.notificationMessage = 'Article added successfully!';
        this.notificationService.showSuccess(this.notificationMessage);
      },
      (error) => {
        this.notificationMessage = 'Failed to add article.';
        this.notificationService.showError(this.notificationMessage);
      },
    );
  }
}
