import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from 'src/app/config/config.service';

@Component({
  selector: 'app-history-config',
  templateUrl: './history-config.component.html',
  styleUrls: ['./history-config.component.css']
})
export class HistoryConfigComponent implements OnInit {

  data: any;

  constructor(private dialogRef: MatDialogRef<HistoryConfigComponent>,
    @Inject(MAT_DIALOG_DATA) private level: string,
    private configService: ConfigService) {
      configService.getHistory(level).subscribe(
        response => {
          console.log(response);
          this.data = response["items"];
        }
      ); 
      console.log(level);
    }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
