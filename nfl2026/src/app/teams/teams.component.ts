import { Component, inject } from '@angular/core';
import { Team } from '../interfaces/team';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {
  teams : Team[] = []
  
  teamService = inject(TeamsService);
  constructor(){
    this.teamService.getTeams().subscribe(
      response => {
        this.teams = response.sort((b, a) => a.powerrank - b.powerrank);
      }
    );
  }

}
