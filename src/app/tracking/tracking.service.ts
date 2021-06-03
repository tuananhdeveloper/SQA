import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

const baseUrl = 'http://localhost:2021/v1/customers';
const billUrl = 'http://localhost:2021/v1/bills';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  
  constructor(private http: HttpClient) {

   }

   getAllCustomer(): Observable<any> {
     return this.http.get(baseUrl);
   }

   updateBill(id: any, payload: any): Observable<any> {
     return this.http.patch(billUrl + "/" + id, payload);
   }
   getBills(customerId: string): Observable<any> {
     return this.http.get(baseUrl + "/" + customerId + "/bills");
   }

   getCustomers(activeAt: any): Observable<any> {
     return this.http.get(baseUrl+ "?active_at=" + activeAt);
   }

   searchCustomers(name: string): Observable<any> {
     return this.http.get(baseUrl + "?name=" + name);
   }
}
