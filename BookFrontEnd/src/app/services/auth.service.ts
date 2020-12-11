import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  out: Observable<string>;
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user: { name: String; email: String; username: String; password: String; }) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers }).pipe(map((response: any) => JSON.stringify(response)));

  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    // return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}).pipe(map((response: any) => JSON.parse(response.json)));
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers }).pipe(map((response: any) => JSON.parse(JSON.stringify(response))));

  }

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', { headers: headers }).pipe(map((response: any) => JSON.parse(JSON.stringify(response))));

  }

  storeUserData(token: string, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }


  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
