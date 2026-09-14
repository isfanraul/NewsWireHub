import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'newswirehub-ui';
  isLoggedIn: any;
  loggedUser: User | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('loggedUser') != null)
      this.loggedUser = this.authService.loggedUser;
  }
  ngOnChange() {
    if (localStorage.getItem('loggedUser') != null)
      this.loggedUser = this.authService.loggedUser;
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.loggedUser = undefined;
  }

  isAdmin(): boolean {
    const role = this.authService.loggedUser?.role;
    return role === 'ADMINISTRATOR';
  }

  isEditorOrAdmin(): boolean {
    const role = this.authService.loggedUser?.role;
    return role === 'ADMINISTRATOR' || role === 'EDITOR';
  }

  isViewerOrEditorOrAdmin(): boolean {
    const role = this.authService.loggedUser?.role;
    return role === 'VIEWER' || role === 'ADMINISTRATOR' || role === 'EDITOR';
  }
}
