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
    this.trackingService.getAllCustomer().subscribe(
      response => {
      
        this.customers = response['items'];
        console.log(this.customers);
      }
    );
  }
}
