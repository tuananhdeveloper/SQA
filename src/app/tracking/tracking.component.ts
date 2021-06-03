import { Component, OnInit } from '@angular/core';
import { TrackingService } from './tracking.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  customers: any;

  constructor(private trackingService: TrackingService) { 

  }

  ngOnInit(): void {

  }

  search(): void {
    let customerName = document.getElementById("customer_name") as HTMLInputElement;

    this.trackingService.searchCustomers(customerName.value).subscribe(
      response => {
      
        this.customers = response['items'];
        console.log(this.customers);
      }
    );
  }
}
