import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  isSuccessful = false;
  isSignInFailed = false;
  errorMessage = '';
  public loggedUser: User | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  authentificationForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  async onSubmit(): Promise<any> {
    this.authService.authentification(this.authentificationForm).subscribe(
      (data) => {
        const user: User = {
          id: data.body.id,
          email: data.body.email,
          username: data.body.username,
          role: data.body.role,
        };
        this.isSuccessful = true;
        this.isSignInFailed = false;
        this.authService.setLoggedUser(user);
        window.location.reload();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isSignInFailed = true;
      },
    );
  }

  ngOnInit(): void {
    this.loggedUser = this.authService.loggedUser;
    if (this.loggedUser != null) {
      this.router.navigateByUrl('/');
    }
  }
}
