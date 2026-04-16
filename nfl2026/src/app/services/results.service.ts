import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game';
@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  url = `http://localhost:3000/results`;
  
    constructor(private http: HttpClient) { }
  
    getResults() : Observable<Game[]>{
      return this.http.get<Game[]>(this.url);
    }


}
