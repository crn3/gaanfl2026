import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game';
import { Team } from '../interfaces/team';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  gameUrl = `http://localhost:3000/games`;
  teamUrl = `http://localhost:3000/teams`;

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gameUrl);
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamUrl);
  }

  updateGame(game: Game): Observable<any> {
    return this.http.post(`${this.gameUrl}/${game.id}`, game);
  }
}
