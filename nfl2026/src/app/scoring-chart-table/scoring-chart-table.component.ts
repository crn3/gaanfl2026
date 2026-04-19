import { Component, Input, input } from '@angular/core';
import { TeamForAgainst } from '../interfaces/team-for-against';

@Component({
  selector: 'app-scoring-chart-table',
  standalone: true,
  imports: [],
  templateUrl: './scoring-chart-table.component.html',
  styleUrl: './scoring-chart-table.component.css',
})
export class ScoringChartTableComponent {
  @Input() teamForAgainst: TeamForAgainst[] = [];
}
