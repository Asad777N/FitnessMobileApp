import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm!: FormGroup;
  isLoading = signal(false);
  showPassword = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  async registerWithEmail(): Promise<void> {
    if (!this.registerForm.valid) return;

    this.isLoading.set(true);
    const { email, password, displayName } = this.registerForm.value;

    this.authService.registerWithEmail(email, password, displayName).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/onboarding']);
      },
      error: async (err) => {
        this.isLoading.set(false);
        const alert = await this.alertController.create({
          header: 'Registration Failed',
          message: err.message || 'Unable to register. Please try again.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
