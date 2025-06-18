import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrlWeather = environment.apiUrlWeather;
  private apiKeyWeather = environment.apiKeyWeather;


  constructor(private http: HttpClient) { }

  getInfoByIPCountry(ipCountry: string) {
    const url = `${this.apiUrlWeather}/current.json?key=${this.apiKeyWeather}&q=${ipCountry}`;
    return this.http.get<any>(url);
  }

}
