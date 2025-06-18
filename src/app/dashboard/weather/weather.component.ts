import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/service/country/country.service';
import { WeatherService } from 'src/app/service/weather/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  countryList: any[] = [];

  constructor(private _countryService: CountryService,
    private _weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this._countryService.getAllCountries().subscribe({
      next: (data) => {
        console.log('Datos de países:', data.countries);
        this.countryList = data.countries;
      },
      error: (error) => {
        console.error('Error al obtener los países:', error);
      },
    });
  }

  selectCountry(ipCountry: string) {
    console.log('IP seleccionado:', ipCountry);

    this._weatherService.getInfoByIPCountry(ipCountry).subscribe({
      next: (data) => {
        console.log('Datos del clima:', data);
      },
      error: (error) => {
        console.error('Error al obtener la información del clima:', error);
      },
    });
  }
}
