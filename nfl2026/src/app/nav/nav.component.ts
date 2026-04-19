import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  loginSerivce = inject(LoginService);
  router = inject(Router);

  handleLogout(event: Event) {
    event.preventDefault();
    this.loginSerivce.logout();
    this.router.navigate(['/']);
  }
}
