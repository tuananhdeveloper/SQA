import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Moment } from 'moment';
import { EditBillComponent } from 'src/app/dialog/edit-bill/edit-bill.component';
import { EditConfigDialogComponent } from 'src/app/dialog/edit-config-dialog/edit-config-dialog.component';
import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-detailed-tracking',
  templateUrl: './detailed-tracking.component.html',
  styleUrls: ['./detailed-tracking.component.css']
})
export class DetailedTrackingComponent implements OnInit {

  id: any;
  bills: any;

  constructor(private trackingService: TrackingService, private route: ActivatedRoute,
    private dialog: MatDialog) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.trackingService.getBills(this.id).subscribe(
      response => {
        console.log(response);
        this.bills = response["items"];
      }
    );
  }

  openEditDialog(bill: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = bill;

    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(EditBillComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        data.year = this.getYear(data.date);
        data.month = this.getMonth(data.date);
        data.date = null;
        
        this.trackingService.updateBill(data.id, data).subscribe((response) => {
          console.log(data);
          alert("Sửa thành công");
          window.location.reload();
        });
      }
    );
  }

  getYear(moment: Moment): Number {
    return Number.parseInt(moment.format("YYYY"));
  }

  getMonth(moment: Moment): Number {
    return Number.parseInt(moment.format("MM"));
  }

}
