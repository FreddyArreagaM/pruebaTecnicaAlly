import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { WeatherComponent } from './weather/weather.component';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    WeatherComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
