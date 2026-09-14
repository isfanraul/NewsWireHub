import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../models/article.model';

@Component({
  standalone: false,
  selector: 'app-article-thumbnail',
  templateUrl: './article-thumbnail.component.html',
  styleUrls: ['./article-thumbnail.component.css'],
})
export class ArticleThumbnailComponent {
  @Input() article!: Article;
}
