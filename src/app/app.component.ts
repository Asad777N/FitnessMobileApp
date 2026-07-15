import { Component, signal } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  darkMode = signal(true);

  constructor(private platform: Platform) {
    this.initializeApp();
    this.setupTheme();
  }

  private initializeApp(): void {
    this.platform.ready().then(() => {
      console.log('App initialized');
    });
  }

  private setupTheme(): void {
    if (this.darkMode()) {
      document.body.classList.add('dark');
    }
  }
}
