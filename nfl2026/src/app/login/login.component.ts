import { Component, inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginService = inject(LoginService);
  router = inject(Router);

  error: string = '';

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  handleLogin() {
    const email = this.loginForm.value.email?.trim();
    const password = this.loginForm.value.password?.trim();

    if (!email || !password) {
      this.error = 'For this to work, you must enter an email and password.';
      return;
    }

    this.loginService.getUsers().subscribe({
      next: (users: User[]) => {
        const user = users.find(
          (u) => u.email == email && u.password == password,
        );
        if (user) {
          this.error = '';
          this.loginService.login();
          this.router.navigate(['/admin']);
        } else {
          this.error = 'Invalid.';
        }
      },
    });
  }
}
