import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { Sitemap } from '../models/sitemap.model';
import { ArticleRequest } from '../models/article-request.model';
import { SitemapRequest } from '../models/sitemap-request.model';
import { AppSettings } from '../AppSettings';


@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private baseUrl = AppSettings.API_ENDPOINT + 'app';

  constructor(private http: HttpClient) {}
  
  getAllArticlesByChannel(channelName: string): Observable<Article[]> {
    return this.http.get<Article[]>(
      `${this.baseUrl}/getAllArticlesByChannel/${channelName}`,
    );
  }
  

  addArticleToChannel(
    channelName: string,
    article: ArticleRequest,
  ): Observable<Article> {
    return this.http.post<Article>(
      `${this.baseUrl}/addArticleToChannel?channelName=${channelName}`,
      article,
    );
  }
  
  getArticle(loc: string): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/getArticle?loc=${loc}`);
  }

  addArticle(article: ArticleRequest): Observable<Article> {
    return this.http.post<Article>(`${this.baseUrl}/addArticle`, article);
  }

  updateArticle(article: Article): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/updateArticle`, article);
  }

  deleteArticle(loc: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/deleteArticle?loc=${loc}`);
  }


  updateArticleInChannel(
    channelName: string,
    article: Article,
  ): Observable<string> {
    return this.http.put<string>(
      `${this.baseUrl}/updateArticleInChannel?channelName=${channelName}`,
      article,
    );
  }


  deleteArticleFromChannel(
    channelName: string,
    loc: string,
  ): Observable<string> {
    return this.http.delete<string>(
      `${this.baseUrl}/deleteArticleFromChannel?channelName=${channelName}&loc=${loc}`,
    );
  }

  getAllChannelNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/channelNames`);
  }

  getAllSitemaps(): Observable<Sitemap[]> {
    return this.http.get<Sitemap[]>(`${this.baseUrl}/getAllSitemaps`);
  }

  addSitemap(sitemap: SitemapRequest): Observable<Sitemap> {
    return this.http.post<Sitemap>(`${this.baseUrl}/addSitemap`, sitemap);
  }

  deleteSitemap(loc: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/deleteSitemap?loc=${loc}`);
  }

  getUrlNews(sitemapLoc: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/getUrlNews`, {
      params: { sitemapLoc },
    });
  }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/getAllArticles`);
  }

  countUrlsByChannel(channelName: string): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/countUrlsByChannel?channelName=${channelName}`,
    );
  }

  latestArticleByChannel(channelName: string): Observable<Map<string, string>> {
    return this.http.get<Map<string, string>>(
      `${this.baseUrl}/latestArticleByChannel?channelName=${channelName}`,
    );
  }

  triggerSitemapNewsMapping(): Observable<string> {
    return this.http.post<string>(
      `${this.baseUrl}/triggerSitemapNewsMapping`,
      {},
    );
  }
}
