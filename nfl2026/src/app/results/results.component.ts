import { Component, inject } from '@angular/core';
import { Team } from '../interfaces/team';
import { TeamsService } from '../services/teams.service';
import { forkJoin, Observable } from 'rxjs';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { BaseGameComponent } from '../base-game/base-game.component';
import { ResultsService } from '../services/results.service';
import { Game } from '../interfaces/game';
import { DivisionFilterComponent } from '../division-filter/division-filter.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [ReactiveFormsModule, DivisionFilterComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})

export class ResultsComponent extends BaseGameComponent {
  resultsService = inject(ResultsService);

  override getGames(): Observable<Game[]> {
    return this.resultsService.getResults();
  }
}