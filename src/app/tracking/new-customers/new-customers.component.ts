import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import moment from 'moment';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-new-customers',
  templateUrl: './new-customers.component.html',
  styleUrls: ['./new-customers.component.css']
})
export class NewCustomersComponent implements OnInit {
  date = new FormControl(moment());
  district = new FormControl();

  options: string[] = [];

  bills: any;
  filteredOptions: Observable<string[]> | undefined;
  constructor(
    private trackingService: TrackingService
  ) { }

  ngOnInit(): void {
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

  filter(): void {
    
    //return this.trackingService.getCustomers()
  }
}
