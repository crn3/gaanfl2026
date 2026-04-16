import { Component, inject } from '@angular/core';
import { DivisionFilterComponent } from '../division-filter/division-filter.component';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Team, TeamWithStats } from '../interfaces/team';
import { Game } from '../interfaces/game';
import { ResultsService } from '../services/results.service';
import { TeamsService } from '../services/teams.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-score-stats',
  standalone: true,
  imports: [DivisionFilterComponent, ReactiveFormsModule],
  templateUrl: './score-stats.component.html',
  styleUrl: './score-stats.component.css',
})
export class ScoreStatsComponent {
  teams: Team[] = [];
  games: Game[] = [];
  teamsWithStats: TeamWithStats[] = [];
  filteredDivision: TeamWithStats[] = [];

  teamsService = inject(TeamsService);
  resultsService = inject(ResultsService);

  filterControl = new FormControl('all');

  ngOnInit() {
    forkJoin({
      teams: this.teamsService.getTeams(),
      games: this.resultsService.getResults(),
    }).subscribe(({ teams, games }) => {
      this.teams = teams;
      this.games = games;

      this.addStats();
      this.filter(this.filterControl.value);
    });
    this.filterControl.valueChanges.subscribe((value) => {
      this.filter(value);
    });
  }

  addStats() {
    this.teamsWithStats = this.teams.map((team) => {
      //getting all times a team appears, as home team and away team
      const homeGames = this.games.filter((g) => g.hteam == team.name);
      const awayGames = this.games.filter((g) => g.ateam == team.name);
      const allGames = [...homeGames, ...awayGames];

      const totalMatches = allGames.length; //will be 5 for all of them

      let totalScore = 0;
      let goals = 0;
      let twoPts = 0;
      let onePts = 0;
      for (let g of homeGames) {
        totalScore += g.hteamtotal;
        goals += g.hgls;
        twoPts += g.h2pts;
        onePts += g.h1pts;
      }
      for (let g of awayGames) {
        totalScore += g.ateamtotal;
        goals += g.agls;
        twoPts += g.a2pts;
        onePts += g.a1pts;
      }

      //could also do:
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
      // if array is [1, 2, 3], reduce gets 1 + 2 + 3.
      // give it an itial value to start and keep adding to it eg 0
      // otherwise itll use whatever is at index 0
      // sum = accumulator
      // g = currentValue
      // 0 = initial value

      // const totalScore =
      //   homeGames.reduce((sum, g) => sum + g.hteamtotal, 0) +
      //   awayGames.reduce((sum, g) => sum + g.ateamtotal, 0);

      const division = homeGames[0].division;

      return {
        ...team,
        division,
        totalMatches,
        totalScore: totalScore / totalMatches,
        goals: goals / totalMatches,
        twoPts: twoPts / totalMatches,
        onePts: onePts / totalMatches,
      };
    });
  }

  filter(value: string | null) { //all,1,2 etc value , or if its null
    if (!value || value == 'all') {
      this.filteredDivision = [...this.teamsWithStats].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    } else {
      this.filteredDivision = this.teamsWithStats
        .filter((team) => team.division.toString() == value)
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  sortBy(column: keyof TeamWithStats | 'name') { //it's giong to be a value from interface, or default 'name'
    this.filteredDivision = this.sortData(this.filteredDivision, column);
  }

  sortData(data: TeamWithStats[], column: keyof TeamWithStats | 'name') {
    return data.sort((a, b) => {
      if (column == 'name') {
        return b.name.localeCompare(a.name); //sort by name if nothing else selected
      }

      const aValue = a[column] as number; //if it's 'goals', getting the value 'goals' from each team object 
      const bValue = b[column] as number;

      return bValue - aValue; 
    });
  }
}
