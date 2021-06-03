import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import { Moment } from 'moment';
import { MY_FORMATS } from 'src/app/report/general-report/general-report.component';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class EditBillComponent implements OnInit {
  form: FormGroup;
  date = new FormControl(moment());
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditBillComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
      let ctrlValue = this.date.value;;
      ctrlValue.year(data.year);
      ctrlValue.month(data.month-1);
      this.date.setValue(ctrlValue);

      this.form = fb.group({
        id: [data.id],
        old_number: [data.old_number, [Validators.required]],
        new_number: [data.new_number, [Validators.required]],
        amount: [data.new_number - data.old_number, [Validators.required]],
        date: [this.date.value]
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

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  
}
