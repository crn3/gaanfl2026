import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseGameComponent } from '../base-game/base-game.component';
import { Game } from '../interfaces/game';
import { FixturesService } from '../services/fixtures.service';
import { DivisionFilterComponent } from '../division-filter/division-filter.component';

@Component({
  selector: 'app-fixtures',
  standalone: true,
  imports: [ReactiveFormsModule, DivisionFilterComponent],
  templateUrl: './fixtures.component.html',
  styleUrl: './fixtures.component.css',
})

export class FixturesComponent extends BaseGameComponent {
  fixturesService = inject(FixturesService);

  override getGames(): Observable<Game[]> {
    return this.fixturesService.getFixtures();
  }
}