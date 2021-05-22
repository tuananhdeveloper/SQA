import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-config-dialog',
  templateUrl: './add-config-dialog.component.html',
  styleUrls: ['./add-config-dialog.component.css']
})
export class AddConfigDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddConfigDialogComponent>) { 
      this.form = fb.group({
        explain: ['', [Validators.required]],
        level: ['', [Validators.required]],
        number_min: ['', [Validators.required]],
        number_max: ['', [Validators.required]],
        price: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}
