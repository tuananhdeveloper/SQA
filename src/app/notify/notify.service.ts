import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:2021/v1';
@Injectable({
  providedIn: 'root'
})
export class NotifyService {


  constructor(private http: HttpClient) { }

  send(payload: any): Observable<any> {
    return this.http.post(baseUrl + "/send-mails", payload);
  }

  report(payload: any): Observable<any> {
    return this.http.post(baseUrl + "/report-mails", payload);
  }
}
