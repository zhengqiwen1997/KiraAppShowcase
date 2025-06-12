import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  authForm: FormGroup;
  isLoginMode = true;
  message = '';
  messageType: 'success' | 'error' = 'error';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  toggleMode(event: Event) {
    event.preventDefault();
    this.isLoginMode = !this.isLoginMode;
    this.message = '';
    this.authForm.reset();
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.isLoading = true;
      this.message = '';

      const formValue = this.authForm.value;

      if (this.isLoginMode) {
        this.authService.login(formValue).subscribe({
          next: (response) => {
            this.isLoading = false;
            console.log('Login response:', response);
            if (response.success) {
              this.router.navigate(['/success']);
            } else {
              this.message = response.message;
              this.messageType = 'error';
            }
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Login error:', error);
            this.message = `Connection error: ${error.message || 'Please check if backend is running'}`;
            this.messageType = 'error';
          }
        });
      } else {
        this.authService.register(formValue).subscribe({
          next: (response) => {
            this.isLoading = false;
            console.log('Register response:', response);
            this.message = response.message;
            this.messageType = response.success ? 'success' : 'error';
            if (response.success) {
              this.authForm.reset();
              // Redirect to login after successful registration
              setTimeout(() => {
                this.isLoginMode = true;
                this.message = 'Account created successfully! Please log in with your credentials.';
                this.messageType = 'success';
              }, 2000); // Show success message for 2 seconds, then switch to login
            }
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Register error:', error);
            this.message = `Connection error: ${error.message || 'Please check if backend is running'}`;
            this.messageType = 'error';
          }
        });
      }
    }
  }
} 