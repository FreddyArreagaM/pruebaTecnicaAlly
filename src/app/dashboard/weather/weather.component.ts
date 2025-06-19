import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/service/country/country.service';
import { TaskService } from 'src/app/service/task/task.service';
import { WeatherService } from 'src/app/service/weather/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  countryList: any[] = [];
  dataCountry: any;
  taskList: any[] = [];
  currentTime: string = '';

  constructor(
    private _countryService: CountryService,
    private _weatherService: WeatherService,
    private _taskService: TaskService
  ) {}

  ngOnInit(): void {
    this._countryService.getAllCountries().subscribe({
      next: (data) => {
        console.log('Datos de países:', data.countries);
        this.countryList = data.countries;
        this.selectCountry(data.countries[0].addressIp);
      },
      error: (error) => {
        console.error('Error al obtener los países:', error);
      },
    });

    this._taskService.getAllTasks().subscribe({
      next: (data) => {
        console.log(data);
        this.taskList = data.tasks;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener las tareas pendientes:', error);
      },
    });
    this.startClock();
  }

  selectCountry(ipCountry: string) {
    console.log('IP seleccionado:', ipCountry);

    this._weatherService.getInfoByIPCountry(ipCountry).subscribe({
      next: (data) => {
        console.log('Datos del clima:', data);
        this.dataCountry = data;
      },
      error: (error) => {
        console.error('Error al obtener la información del clima:', error);
      },
    });
  }

  startClock() {
    setInterval(() => {
      if (this.dataCountry?.location?.tz_id) {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: this.dataCountry.location.tz_id,
        };
        this.currentTime = now.toLocaleTimeString('en-US', options);
      }
    }, 1000);
  }
}
