import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddConfigDialogComponent } from '../dialog/add-config-dialog/add-config-dialog.component';
import { EditConfigDialogComponent } from '../dialog/edit-config-dialog/edit-config-dialog.component';
import { HistoryConfigComponent } from '../dialog/history-config/history-config.component';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  configs:any;

  constructor(private configService: ConfigService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.configService.getAll().subscribe(
      response => {
        console.log(response);
        this.configs = response["items"];
      }
    );
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(AddConfigDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log(data);
        this.configService.add(data).subscribe(data => {
          window.location.reload();
        });
      }
    );
  }

  openHistoryDialog(level: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = level;
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(HistoryConfigComponent, dialogConfig);

  }

  openEditDialog(config: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = config;

    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(EditConfigDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        this.configService.update(data).subscribe(data => {
          console.log(data);
          window.location.reload();
        });
      }
    );
  }

}
