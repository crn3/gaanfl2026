import { Component, inject, OnInit } from '@angular/core';
import { Game, GameWithColour } from '../interfaces/game';
import { Team } from '../interfaces/team';
import { TeamsService } from '../services/teams.service';
import { forkJoin, Observable } from 'rxjs';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-game',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './base-game.component.html',
  styleUrl: './base-game.component.css'
})
export abstract class BaseGameComponent implements OnInit {

  games: GameWithColour[] = [];
  filteredGames: GameWithColour[] = [];
  teams: Team[] = [];
  groupedGames: { round: number; games: GameWithColour[] }[] = [];

  teamsService = inject(TeamsService);

  filterControl = new FormControl('all');

  ngOnInit(){ //lets getGames, getResults run first. nothing shows if this is constructor()
    this.loadData();

    this.filterControl.valueChanges.subscribe((value) => {
      this.filter(value);
    });
  }

  abstract getGames(): Observable<Game[]>;

  loadData(){

    forkJoin({
      games: this.getGames(),
      teams: this.teamsService.getTeams(),
    }).subscribe(({ games, teams }) => {
      this.teams = teams;

      this.games = games.map((result) => {
        var homeTeam = teams.find((t) => t.name == result.hteam);
        var awayTeam = teams.find((t) => t.name == result.ateam);

        return {
          ...result,
          homeR: homeTeam ? homeTeam.r : 0,
          homeG: homeTeam ? homeTeam.g : 0,
          homeB: homeTeam ? homeTeam.b : 0,
          awayR: awayTeam ? awayTeam.r : 0,
          awayG: awayTeam ? awayTeam.g : 0,
          awayB: awayTeam ? awayTeam.b : 0,
        };
      });
      
      this.filteredGames = this.games;
      this.groupByRound(); // without this table doesn't populate when page first loads
    });
  }

  // do filtering, afterwards jump into grouping by rounds
  filter(value: string | null) {
    if (!value || value === 'all') {
      this.filteredGames = this.games;
    } else {
      this.filteredGames = this.games.filter(
        r => r.division.toString() === value,
      );
    }
    this.groupByRound();
  }

  groupByRound(){
    //maps each round (key) with an array of games (value) 
    let map = new Map<number, GameWithColour[]>();
    //for all the games in the array of filtered games...
    for (let game of this.filteredGames) {
      if (!map.has(game.round)) { // create the round if it doesn't exist yet
        map.set(game.round, []);
      }
      map.get(game.round)!.push(game); // push the game into the matching round array
    }
    this.groupedGames = Array.from(map.entries()) //convert map entries to array
    .map(([round, games]) => ({ round, games: games.sort((a,b) => a.hteam.localeCompare(b.hteam)) }))
    .sort((a, b) => a.round - b.round); // sorts them 1, 2,3...
  }
}
