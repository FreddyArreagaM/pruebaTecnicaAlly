import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.myApiUrl;

  constructor(private http: HttpClient) { }

  // login with observable
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, body);
  }

  // register with observable
  register(name: string, email: string, password: string): Observable<any> {
    const user = { name, email, password };
    return this.http.post<any>(`${this.apiUrl}/auth/register`, user);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/users`);
  }
}
