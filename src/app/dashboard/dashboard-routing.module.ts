import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'weather',
    pathMatch: 'full',
  },
  {
    path: 'weather',
    component: WeatherComponent,
  },
  {
    path: 'user', 
    component: UserListComponent,
  },
  {
    path: '**',
    redirectTo: 'weather',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
