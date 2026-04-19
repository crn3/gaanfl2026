import { Component, inject } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Game } from '../interfaces/game';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TeamsService } from '../services/teams.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  adminService = inject(AdminService);
  teamsService = inject(TeamsService);
  fb = inject(FormBuilder);

  message = '';
  validTeamNames = new Set<string>();

  adminForm = this.fb.group({
    games: this.fb.array<FormGroup>([]),
  });

  ngOnInit() {
    this.loadGames();
  }

  get gamesArray(): FormArray<FormGroup> {
    return this.adminForm.get('games') as FormArray<FormGroup>; //array of many form grous. each row is a form group
  }

  loadGames() {
    forkJoin({
      games: this.adminService.getGames(),
      teams: this.teamsService.getTeams(),
    }).subscribe(({ games, teams }) => {
      this.validTeamNames = new Set(
        teams.map((team) => team.name.trim().toLowerCase()),
      );

      this.gamesArray.clear();

      for (const game of games) {
        this.gamesArray.push(
          this.fb.group({
            id: [game.id],
            division: [game.division],
            round: [game.round],
            hteam: [game.hteam],
            hteamscore: [game.hteamscore],
            ateamscore: [game.ateamscore],
            ateam: [game.ateam],
          }),
        );
      }
    });
  }

  isTeam(name: string): boolean {
    if (!name) return false;
    return this.validTeamNames.has(name.trim().toLowerCase());
  }

  updateGame(index: number) {
    const game = this.gamesArray.at(index).value as Game;

    this.adminService.updateGame(game).subscribe({
      next: () => {
        alert(`Game ${game.id} updated`);
      },
      error: (err) => {
        console.error(err);
        alert(`Error updating game ${game.id}`);
      },
    });
  }
}
