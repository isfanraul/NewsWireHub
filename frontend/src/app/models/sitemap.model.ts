import { Article } from './article.model';

export class Sitemap {
  id!: number;
  loc!: string;
  channel!: string;
  articles!: Article[];
}
