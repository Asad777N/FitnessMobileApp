import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm!: FormGroup;
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async loginWithEmail(): Promise<void> {
    if (!this.loginForm.valid) return;

    this.isLoading.set(true);
    const { email, password } = this.loginForm.value;

    this.authService.loginWithEmail(email, password).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/tabs/home']);
      },
      error: async (err) => {
        this.isLoading.set(false);
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: err.message || 'Unable to login. Please try again.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }

  async loginWithGoogle(): Promise<void> {
    this.isLoading.set(true);
    this.authService.loginWithGoogle().subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/tabs/home']);
      },
      error: async (err) => {
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  async loginWithApple(): Promise<void> {
    this.isLoading.set(true);
    this.authService.loginWithApple().subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/tabs/home']);
      },
      error: async (err) => {
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
