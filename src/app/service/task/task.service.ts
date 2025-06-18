import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = environment.myApiUrl;

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tasks/pending`);
  }
}
