import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
          ],
        ],
        confirmPassword: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        name: [''],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.loading = true;
      this.error = '';

      const userData = {
        username: this.signupForm.value.username,
        password: this.signupForm.value.password,
        email: this.signupForm.value.email,
        name: this.signupForm.value.name,
      };

      this.authService.createUser(userData).subscribe({
        next: (success) => {
          this.loading = false;
          if (success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.error = 'Failed to create account. Please try again.';
          }
        },
        error: (error) => {
          this.loading = false;
          this.error =
            error?.error?.status_message || 'An unexpected error occurred.';
        },
      });
    }
  }
}
