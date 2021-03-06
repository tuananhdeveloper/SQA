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
import * as XLSX from 'xlsx'; 


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

  fileName = "WaterExport.xlsx";
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
              this.cal(res["items"], this.bills[i].new_number - this.bills[i].old_number,
                this.bills[i]);
            }
          }
        )

      }
    );
  }

  print(): void {
    
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    if(WindowPrt != null) {
      const printContent = document.getElementById("mytable");
      const totalPrice = document.getElementById("totalPrice");

      if(printContent != null && totalPrice != null) {
        WindowPrt.document.write('<html><head><title>In b??o c??o</title>');
        //WindowPrt.document.write('<link rel="stylesheet" href="http://www.dynamicdrive.com/ddincludes/mainstyle.css" type="text/css" />');
        WindowPrt.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">');
        WindowPrt.document.write('<link rel="preconnect" href="https://fonts.gstatic.com">');
        WindowPrt.document.write('<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">');
        WindowPrt.document.write('</head><body >');
        WindowPrt.document.write(printContent.innerHTML);
        WindowPrt.document.write(totalPrice.innerHTML);
        WindowPrt.document.write('</body></html>');
        WindowPrt.document.close();
        WindowPrt.print();
        //WindowPrt.close();
      }

     
    }

  }

  exportExcel(): void {
    if(this.bills != null && this.bills.length > 0) {
      /* table id is passed over here */   
      let element = document.getElementById('mytable'); 
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);    
    }
    else {
      alert("Kh??ng c?? d??? li???u");
    }
  }
}


