import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user.model';
import { AdminPopupComponent } from '../admin-popup/admin-popup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangeRoleDialogComponent } from '../change-role-dialog/change-role-dialog.component';

@Component({
  standalone: false,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  errorMessage: string = '';
  roles: string[] = ['ADMINISTRATOR', 'EDITOR', 'VIEWER'];
  selectedRole: string = '';

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.adminService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        this.errorMessage = error;
        console.log('Error retrieving users:', error);
      },
    );
  }

  deleteUser(username: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(username).subscribe(
        (response) => {
          console.log('User deleted successfully');
          this.getAllUsers();
        },
        (error) => {
          console.log('Error deleting user:', error);
        },
      );
    }
  }

  changeUserRole(username: string) {
    if (confirm('Are you sure you want to change the role of this user?')) {
      this.selectedRole = '';

      const dialogRef = this.dialog.open(ChangeRoleDialogComponent, {
        width: '400px',
        data: {
          roles: this.roles,
          selectedRole: this.selectedRole,
        },
      });

      dialogRef.afterClosed().subscribe((result: string) => {
        if (result) {
          this.adminService.changeUserRole(username, result).subscribe(
            (response) => {
              console.log('User role changed successfully');
              this.getAllUsers();
            },
            (error) => {
              console.log('Error changing user role:', error);
            },
          );
        }
      });
    }
  }

  registerUser() {
    const dialogRef = this.dialog.open(AdminPopupComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
      }
      this.getAllUsers();
    });
  }
}
