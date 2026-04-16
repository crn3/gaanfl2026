import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  @Input() loggedIn: boolean = false;

  handleLogout(){
    localStorage.setItem('loggedIn', 'false');
    this.loggedIn = false;
  } // this should possibly be a log out service
  // data and handling it happens elsewhere

}
