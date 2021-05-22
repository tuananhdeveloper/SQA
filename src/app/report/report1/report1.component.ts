import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { ReportService } from '../report.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_FORMATS } from '../general-report/general-report.component';
import {map, startWith} from 'rxjs/operators';
import { ConfigService } from 'src/app/config/config.service';


const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.css'],
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
export class Report1Component implements OnInit {

  constructor(private reportService: ReportService,
    private configSerivce: ConfigService) {

  }
  date = new FormControl(moment());
  district = new FormControl();
  bills: any;
  options: string[] = [];
  totalPrice = 0;
  filteredOptions: Observable<string[]> | undefined;

  checked: boolean = false;
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
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getYear(moment: Moment): Number {
    return Number.parseInt(moment.format("YYYY"));
  }

  getMonth(moment: Moment): Number {
    return Number.parseInt(moment.format("MM"));
  }


  cal(waterPrice: any, amount: number, bill: any) {
    let totalPrice = 0;
    for(let i = 0; i < waterPrice.length; i++) {
      if(amount > waterPrice[i].number_min && amount <= waterPrice[i].number_max) {
        totalPrice += (amount - waterPrice[i].number_min)*waterPrice[i].price;
        break;
      }
      else {
        totalPrice += (waterPrice[i].number_max - waterPrice[i].number_min)*waterPrice[i].price;
      }
    }
    console.log(totalPrice);
    bill.total_price = totalPrice;

    this.totalPrice += totalPrice;
  }

  report() {
    this.totalPrice = 0;
    this.reportService.getBill(this.district.value, 
      this.getYear(this.date.value),
      this.getMonth(this.date.value) 
    ).subscribe(
      response => {
        console.log(response);
        this.bills = response["items"];

        //for price
        this.configSerivce.getAll().subscribe(
          res => {
            for(let i = 0; i < this.bills.length; i++) {
              this.cal(res["items"], this.bills[i].finish_number - this.bills[i].start_number,
                this.bills[i]);
            }
          }
        )

      }
    );
  }

}


