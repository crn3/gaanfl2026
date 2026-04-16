import { Injectable } from '@angular/core';
import { Manager } from '../interfaces/manager';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagersService {

  url = `http://localhost:3000/managers`;

  constructor(private http: HttpClient) { }

  getManagers() : Observable<Manager[]>{
    return this.http.get<Manager[]>(this.url);
  }

}
