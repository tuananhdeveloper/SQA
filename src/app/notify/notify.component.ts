import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import moment, { Moment } from 'moment';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { MY_FORMATS } from '../report/general-report/general-report.component';
import { ReportService } from '../report/report.service';
import { NotifyService } from './notify.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
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
export class NotifyComponent implements OnInit {
  date = new FormControl(moment());
  district = new FormControl();
  bills: any;
  options: string[] = [];
  totalPrice = 0;
  filteredOptions: Observable<string[]> | undefined;

  constructor(private reportService: ReportService,
    private configSerivce: ConfigService,
    private notifyService: NotifyService) { }

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

  filter(): void {
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
              this.cal(res["items"], this.bills[i].new_number - this.bills[i].old_number,
                this.bills[i]);
            }
          }
        )        
      }
    );
  }

  notify(): void {
    let list_data = [];
    for(let i = 0; i < this.bills.length; i++) {
      if(this.bills[i].status == 'unpaid') {
        let data = {
          id: this.bills[i].id,
          amount: this.bills[i].new_number - this.bills[i].old_number,
          old_number: this.bills[i].old_number,
          new_number: this.bills[i].new_number,
          total_price: this.bills[i].total_price,
          month: this.bills[i].month,
          year: this.bills[i].year,
          customer: {
            name: this.bills[i].customer.name,
            address: this.bills[i].customer.address,
            phone: this.bills[i].customer.phone,
            email: this.bills[i].customer.email
          }
        }
  
        list_data.push(data);
      }
    }

    this.notifyService.report(list_data).subscribe((response) => {
      console.log(response);
      alert("Đã gửi");
    });
  }

  send(): void {
    let list_data = [];
    for(let i = 0; i < this.bills.length; i++) {
      if(this.bills[i].status == 'unpaid') {
        let data = {
          id: this.bills[i].id,
          amount: this.bills[i].new_number - this.bills[i].old_number,
          old_number: this.bills[i].old_number,
          new_number: this.bills[i].new_number,
          total_price: this.bills[i].total_price,
          month: this.bills[i].month,
          year: this.bills[i].year,
          customer: {
            name: this.bills[i].customer.name,
            address: this.bills[i].customer.address,
            phone: this.bills[i].customer.phone,
            email: this.bills[i].customer.email
          }
        }
  
        list_data.push(data);
      }
    }

    this.notifyService.send(list_data).subscribe((response) => {
      console.log(response);
      alert("Đã gửi");
    });
  }
}
