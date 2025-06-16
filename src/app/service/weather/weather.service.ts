import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKeyWeather = environment.apiUrlWeather;

  constructor(private http: HttpClient) { }

}
