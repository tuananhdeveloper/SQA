import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:2021/v1/configs';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  add(data: any) {
    return this.http.post(baseUrl, data);
  }

  update(data: any) {
    return this.http.patch(baseUrl+"/" + data.level, data);
  }

  getHistory(level: string): Observable<any> {
    return this.http.get(baseUrl + "/" + level + "/config-prices")
  }
}
