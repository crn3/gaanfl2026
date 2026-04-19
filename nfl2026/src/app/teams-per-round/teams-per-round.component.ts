import { Component, inject } from '@angular/core';
import { Game } from '../interfaces/game';
import { TeamRoundStats } from '../interfaces/team-round-stats';
import { ResultsService } from '../services/results.service';
import { TeamsService } from '../services/teams.service';
import { Team } from '../interfaces/team';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-teams-per-round',
  standalone: true,
  imports: [],
  templateUrl: './teams-per-round.component.html',
  styleUrl: './teams-per-round.component.css',
})
export class TeamsPerRoundComponent {
  games: Game[] = [];
  teams: Team[] = [];
  teamsWithRoundStats: TeamRoundStats[] = [];

  resultsService = inject(ResultsService);
  teamsService = inject(TeamsService);

  ngOnInit() {
    forkJoin({
      games: this.resultsService.getResults(),
      teams: this.teamsService.getTeams(),
    }).subscribe(({ games, teams }) => {
      this.games = games;
      this.teams = teams;
      this.getRoundStats();
    });
  }

  getRoundStats() {
    this.teamsWithRoundStats = this.teams
      .map((team) => {
        return {
          name: team.name,
          round1_scores: this.getTeamRoundAverage(team.name, 1),
          round2_scores: this.getTeamRoundAverage(team.name, 2),
          round3_scores: this.getTeamRoundAverage(team.name, 3),
          round4_scores: this.getTeamRoundAverage(team.name, 4),
          round5_scores: this.getTeamRoundAverage(team.name, 5),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  getTeamRoundAverage(team: string, round: number): number {
    var roundGames = this.games.filter(
      (g) => g.round == round && (g.hteam == team || g.ateam == team),
    );

    if (roundGames.length == 0) {
      return 0;
    }
    let total = 0;

    for (let game of roundGames) {
      if (game.hteam == team) {
        total += game.hteamtotal;
      } else {
        total += game.ateamtotal;
      }
    }
    return total / roundGames.length;
  }
}
