import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl = environment.myApiUrl;

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/country`);
  }
}
