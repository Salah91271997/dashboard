import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /**
   * Handles user login
   */
  onLogin(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.error = 'Invalid email or password';
          }
          this.loading = false;
        },
        error: (error) => {
          this.error =
            error?.error?.status_message || 'An error occurred during login';
          this.loading = false;
        },
      });
    }
  }

  /**
   * Handles guest session creation
   */
  onGuestLogin(): void {
    this.loading = true;
    this.error = '';

    this.authService.createGuestSession().subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Failed to create guest session';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to create guest session';
        this.loading = false;
      },
    });
  }
}
