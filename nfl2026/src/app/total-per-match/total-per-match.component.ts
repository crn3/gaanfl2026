import { Component, inject } from '@angular/core';
import { Game } from '../interfaces/game';
import { ResultsService } from '../services/results.service';
import { DivisionRoundStats } from '../interfaces/division-round-stats';

@Component({
  selector: 'app-total-per-match',
  standalone: true,
  imports: [],
  templateUrl: './total-per-match.component.html',
  styleUrl: './total-per-match.component.css',
})
export class TotalPerMatchComponent {
  games: Game[] = [];
  divisions: DivisionRoundStats[] = [];

  resultsService = inject(ResultsService);

  ngOnInit() {
    this.resultsService.getResults().subscribe((games) => {
      this.games = games;
      this.getDivisionStats();
    });
  }

  getDivisionStats() {
    this.divisions = [...new Set(this.games.map((g) => g.division))].map(
      (divisionNumber) => {
        return {
          division: divisionNumber,
          round1_scores: this.getDivisionRoundAverage(divisionNumber, 1),
          round2_scores: this.getDivisionRoundAverage(divisionNumber, 2),
          round3_scores: this.getDivisionRoundAverage(divisionNumber, 3),
          round4_scores: this.getDivisionRoundAverage(divisionNumber, 4),
          round5_scores: this.getDivisionRoundAverage(divisionNumber, 5),
        };
      },
    );
  }

  getDivisionRoundAverage(division: number, round: number): number {
    var gamesInRound = this.games.filter(
      (g) => g.division == division && g.round == round,
    );

    if (gamesInRound.length === 0) {
      return 0;
    }
    let total = 0;

    for (let game of gamesInRound) {
      total += game.hteamtotal + game.ateamtotal;
    }

    return Math.ceil((total / gamesInRound.length) * 10) / 10;
  }
}
