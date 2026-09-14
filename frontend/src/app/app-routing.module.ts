import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { SitemapListComponent } from './sitemap-list/sitemap-list.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { SearchComponent } from './search/search.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { authAdminGuard } from './helpers/auth-admin.guard';
import { authEditorGuard } from './helpers/auth-editor.guard';
import { authViewerGuard } from './helpers/auth-viewer.guard';
import { ArticlesFromSitemapComponent } from './articles-from-sitemap/articles-from-sitemap.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'article-details/:id',
    component: ArticleDetailsComponent,
    canActivate: [authEditorGuard],
  },
  {
    path: 'article-list',
    component: ArticleListComponent,
    canActivate: [authViewerGuard],
  },
  {
    path: 'sitemap-list',
    component: SitemapListComponent,
    canActivate: [authAdminGuard],
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authViewerGuard],
  },
  {
    path: 'article-create',
    component: ArticleCreateComponent,
    canActivate: [authEditorGuard],
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [authViewerGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'authentication', component: AuthenticationComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [authAdminGuard],
  },
  {
    path: 'articlefromsitemap',
    component: ArticlesFromSitemapComponent,
    canActivate: [authAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
