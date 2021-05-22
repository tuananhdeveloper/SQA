import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:2021/v1/bills';
@Injectable({
  providedIn: 'root'
})
export class ReportService {


  constructor(private http: HttpClient) { }

  getAllDistrict(): Observable<any> {
    return this.http.get("assets/data/district.json");
  }

  getBill(address: string, year: Number, month: Number): Observable<any> {
    return this.http.get(baseUrl + "?customer.address=" + address + 
    "&year=" + year + "&month=" + month);
  }
}
