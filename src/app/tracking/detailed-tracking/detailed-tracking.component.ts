import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-detailed-tracking',
  templateUrl: './detailed-tracking.component.html',
  styleUrls: ['./detailed-tracking.component.css']
})
export class DetailedTrackingComponent implements OnInit {

  id: any;
  bills: any;

  constructor(private trackingService: TrackingService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.trackingService.getBills(this.id).subscribe(
      response => {
        console.log(response);
        this.bills = response["items"];
      }
    );
  }

}
