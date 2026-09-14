import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: false,
  selector: 'app-add-sitemap-dialog',
  templateUrl: './add-sitemap-dialog.component.html',
  styleUrls: ['./add-sitemap-dialog.component.css']
})
export class AddSitemapDialogComponent {

  formData: { loc: string, channel: string } = { loc: '', channel: '' };

  constructor(
    public dialogRef: MatDialogRef<AddSitemapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  isFormValid(): boolean {
    return !!this.formData.loc && !!this.formData.channel;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.isFormValid()) {
      this.dialogRef.close(this.formData);
    }
  }
}
