import { Injectable } from '@angular/core';
import { Game } from '../interfaces/game';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FixturesService {

  url = `http://localhost:3000/fixtures`;
  
  constructor(private http: HttpClient) { }
  
  getFixtures() : Observable<Game[]>{
    return this.http.get<Game[]>(this.url);
      }
  
}
