import { Component, inject } from '@angular/core';
import { D3ChartComponent } from '../d3-chart/d3-chart.component';
import { TeamsService } from '../services/teams.service';
import { ResultsService } from '../services/results.service';
import { Game } from '../interfaces/game';
import { Team } from '../interfaces/team';
import { TeamForAgainst } from '../interfaces/team-for-against';
import { forkJoin } from 'rxjs';
import { ScoringChartTableComponent } from '../scoring-chart-table/scoring-chart-table.component';

@Component({
  selector: 'app-scoring-chart',
  standalone: true,
  imports: [ScoringChartTableComponent, D3ChartComponent],
  templateUrl: './scoring-chart.component.html',
  styleUrl: './scoring-chart.component.css',
})
export class ScoringChartComponent {
  teams: Team[] = [];
  results: Game[] = [];
  teamsForAgainst: TeamForAgainst[] = [];

  teamsService = inject(TeamsService);
  resultsService = inject(ResultsService);

  ngOnInit() {
    forkJoin({
      teams: this.teamsService.getTeams(),
      results: this.resultsService.getResults(),
    }).subscribe(({ teams, results }) => {
      this.teams = teams;
      this.results = results;
      this.getForAgainstStats();
    });
  }
  getForAgainstStats() {
    this.teamsForAgainst = this.teams
      .map((team) => {
        let scoresFor = 0;
        let scoresAgainst = 0;

        for (let game of this.results) {
          if (game.hteam == team.name) {
            scoresFor += game.hteamtotal;
            scoresAgainst += game.ateamtotal;
          } else if (game.ateam == team.name) {
            scoresFor += game.ateamtotal;
            scoresAgainst += game.hteamtotal;
          }
        }
        return {
          name: team.name,
          shortName: (
            team.name.charAt(0) + team.name.charAt(team.name.length - 1)
          ).toUpperCase(),
          scoresFor: scoresFor,
          scoresAgainst: scoresAgainst,
          r: team.r,
          g: team.g,
          b: team.b,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }
}
