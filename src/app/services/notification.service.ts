import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {
    this.initNotifications();
  }

  private async initNotifications(): Promise<void> {
    console.log('Notifications initialized');
  }

  scheduleWorkoutReminder(title: string, body: string, scheduleAt: Date): Observable<void> {
    console.log('Workout reminder scheduled:', title, body, scheduleAt);
    return from(Promise.resolve(void 0));
  }

  scheduleWaterReminder(scheduleAt: Date): Observable<void> {
    console.log('Water reminder scheduled:', scheduleAt);
    return from(Promise.resolve(void 0));
  }

  sendInstantNotification(title: string, body: string): Observable<void> {
    console.log('Instant notification sent:', title, body);
    return from(Promise.resolve(void 0));
  }
}
