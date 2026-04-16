import { Injectable } from '@angular/core';
import { Team } from '../interfaces/team';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  url = `http://localhost:3000/teams`;

  constructor(private http: HttpClient) { }

  getTeams() : Observable<Team[]>{
      return this.http.get<Team[]>(this.url);
    }

    updatePowerrank(team: Team): Observable<Team>{
      return this.http.post<Team>(`${this.url}/powerrank/${team.id}`, {powerrank: team.powerrank + 1});
    }
}
