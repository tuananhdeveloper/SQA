import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddConfigDialogComponent } from '../add-config-dialog/add-config-dialog.component';

@Component({
  selector: 'app-edit-config-dialog',
  templateUrl: './edit-config-dialog.component.html',
  styleUrls: ['./edit-config-dialog.component.css']
})
export class EditConfigDialogComponent implements OnInit {

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    this.form = fb.group({
      explain: [data.explain, [Validators.required]],
      level: [data.level, [Validators.required]],
      number_min: [data.number_min, [Validators.required]],
      number_max: [data.number_max, [Validators.required]],
      price: [data.price, [Validators.required]]
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
