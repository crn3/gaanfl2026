import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = `http://localhost:3000/users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  private loggedInSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('loggedIn') == 'true',
  );
  loggedIn = this.loggedInSubject.asObservable();

  login() {
    localStorage.setItem('loggedIn', 'true');
    this.loggedInSubject.next(true);
  }

  logout() {
    localStorage.setItem('loggedIn', 'false');
    this.loggedInSubject.next(false);
  }
  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }
}
