import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

const baseUrl = 'http://localhost:2021/v1/customers';
@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  
  constructor(private http: HttpClient) {

   }

   getAllCustomer(): Observable<any> {
     return this.http.get(baseUrl);
   }

   getBills(customerId: string): Observable<any> {
     return this.http.get(baseUrl + "/" + customerId + "/bills");
   }
}
