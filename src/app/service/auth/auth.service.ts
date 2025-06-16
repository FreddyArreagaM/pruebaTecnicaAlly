import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) { }

  // login with observable
/*   login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, body);
  } */

  // Login with simuate data
  login(email: string, password: string) {
    console.log("🚀 ~ AuthService ~ login ~ email:", email);
    console.log("🚀 ~ AuthService ~ login ~ password:", password);

    // Simulate a successful login
    return new Observable(observer => {
      setTimeout(() => {
        if (email === 'test@example.com' && password === 'password') {
          observer.next({ email, token: 'mock-token' });
        } else {
          observer.error('Invalid credentials');
        }
        observer.complete();
      }, 1000);
    });
  }


  // register with observable
/*   register(name: string, email: string, password: string): Observable<any> {
    const user = { name, email, password };
    console.log("🚀 ~ AuthService ~ register ~ user:", user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/auth/register`, user, { headers });
  } */

  // Register with simulate data
  register(name: string, email: string, password: string) {
    console.log("🚀 ~ AuthService ~ register ~ name:", name);
    console.log("🚀 ~ AuthService ~ register ~ email:", email);
    console.log("🚀 ~ AuthService ~ register ~ password:", password);

    // Simulate a successful registration
    return new Observable(observer => {
      setTimeout(() => {
        if (email && password) {
          observer.next({ name, email, token: 'mock-token' });
        } else {
          observer.error('Registration failed');
        }
        observer.complete();
      }, 1000);
    });
  }
}
