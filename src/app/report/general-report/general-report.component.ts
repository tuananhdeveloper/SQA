import { OnInit } from '@angular/core';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {map, startWith} from 'rxjs/operators';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { Observable } from 'rxjs';
import { ReportService } from '../report.service';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.css'],
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
  ],

})

export class GeneralReportComponent implements OnInit {
  date = new FormControl(moment());
  district = new FormControl();

  options: string[] = [];

  bills: any;
  filteredOptions: Observable<string[]> | undefined;
  
  constructor(private reportService: ReportService) {
   }

  ngOnInit(): void {
    this.reportService.getAllDistrict().subscribe(
      response => {
        for(let key in response) {
          console.log(response[key].name);
          this.options.push(response[key].name);
          this.district.setValue("");
        }
      }
    );

    this.filteredOptions = this.district.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

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

  getYear(moment: Moment): Number {
    return Number.parseInt(moment.format("YYYY"));
  }

  getMonth(moment: Moment): Number {
    return Number.parseInt(moment.format("MM"));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  getTotal(): Number {
    let total = 0;
    for(let i = 0; i < this.bills.length; i++) {
      total += (this.bills[i].finish_number - this.bills[i].start_number)
    }
    return total;
  }

  report() {
    this.reportService.getBill(this.district.value, 
      this.getYear(this.date.value),
      this.getMonth(this.date.value) 
    ).subscribe(
      response => {
        console.log(response);
        this.bills = response["items"];
      }
    );
  }
}
