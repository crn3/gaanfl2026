import { Component, inject } from '@angular/core';
import { Manager } from '../interfaces/manager';
import { ManagersService } from '../services/managers.service';

@Component({
  selector: 'app-managers',
  standalone: true,
  imports: [],
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.css'
})
export class ManagersComponent {

  managers : Manager[] = []

  managerService = inject(ManagersService);

  constructor(){
    this.managerService.getManagers().subscribe(
      response => {
        this.managers = response;
      }
    );
  }

}
