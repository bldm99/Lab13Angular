import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation1',
  templateUrl: './delete-confirmation1.component.html',
  styleUrls: ['./delete-confirmation1.component.css']
})
export class DeleteConfirmation1Component {

  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmation1Component>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  closeModal(): void {
    this.dialogRef.close(false);
  }

}
