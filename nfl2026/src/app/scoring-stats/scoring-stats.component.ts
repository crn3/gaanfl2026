import { Component } from '@angular/core';
import { TotalPerMatchComponent } from "../total-per-match/total-per-match.component";
import { TeamsPerRoundComponent } from "../teams-per-round/teams-per-round.component";


@Component({
  selector: 'app-scoring-stats',
  standalone: true,
  imports: [TotalPerMatchComponent, TeamsPerRoundComponent],
  templateUrl: './scoring-stats.component.html',
  styleUrl: './scoring-stats.component.css'
})
export class ScoringStatsComponent {

}
