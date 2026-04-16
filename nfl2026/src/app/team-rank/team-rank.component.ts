import { Component, inject } from '@angular/core';
import { TeamsService } from '../services/teams.service';
import { Team } from '../interfaces/team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-rank',
  standalone: true,
  imports: [],
  templateUrl: './team-rank.component.html',
  styleUrl: './team-rank.component.css'
})
export class TeamRankComponent {

  teams: Team[] = [];
  team1!: Team;
  team2!: Team;
  votes = 5;

  teamService = inject(TeamsService);
  router = inject(Router);

  ngOnInit(){
    this.teamService.getTeams().subscribe((teams) => {
      this.teams = teams;
      this.getRandomTeams();
    });
  }
  
  getRandomTeams(){
    const firstIndex = Math.floor(Math.random() * this.teams.length);
    let secondIndex = Math.floor(Math.random() * this.teams.length);

    while(firstIndex == secondIndex){
      secondIndex = Math.floor(Math.random() * this.teams.length);
    }

    this.team1 = this.teams[firstIndex];
    this.team2 = this.teams[secondIndex];

  }

  vote(team: Team){
    this.teamService.updatePowerrank(team).subscribe(() => {
    team.powerrank++;
    this.votes--;

      if(this.votes <= 0){
        this.router.navigate(['/teams']);
      }else{
        this.getRandomTeams();
      }
    });
  }


}
