import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  standalone: false,
  selector: 'app-change-role-dialog',
  templateUrl: 'change-role-dialog.component.html',
})
export class ChangeRoleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ChangeRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { roles: string[]; selectedRole: string },
  ) {}
}
