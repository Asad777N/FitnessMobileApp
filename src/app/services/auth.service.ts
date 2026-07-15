import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { User, UserProfile } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<User | null>(null);
  isAuthenticated = signal(false);

  constructor(private router: Router) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
      this.isAuthenticated.set(true);
    }
  }

  registerWithEmail(email: string, password: string, displayName: string): Observable<User> {
    return from(
      Promise.resolve({
        uid: this.generateUid(),
        email,
        displayName,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User)
    ).pipe(
      map((user) => {
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      })
    );
  }

  loginWithEmail(email: string, password: string): Observable<User | null> {
    return from(
      Promise.resolve({
        uid: this.generateUid(),
        email,
        displayName: email.split('@')[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User)
    ).pipe(
      map((user) => {
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      })
    );
  }

  loginWithGoogle(): Observable<User | null> {
    return from(
      Promise.resolve({
        uid: this.generateUid(),
        email: 'user@gmail.com',
        displayName: 'Google User',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User)
    ).pipe(
      map((user) => {
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      })
    );
  }

  loginWithApple(): Observable<User | null> {
    return from(
      Promise.resolve({
        uid: this.generateUid(),
        email: 'user@apple.com',
        displayName: 'Apple User',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User)
    ).pipe(
      map((user) => {
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      })
    );
  }

  logout(): Observable<void> {
    return from(
      Promise.resolve(void 0)
    ).pipe(
      map(() => {
        this.currentUser.set(null);
        this.isAuthenticated.set(false);
        localStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      })
    );
  }

  updateUserProfile(uid: string, profile: Partial<UserProfile>): Promise<void> {
    const user = this.currentUser();
    if (user) {
      const updatedUser = {
        ...user,
        profile: { ...user.profile, ...profile } as UserProfile,
        updatedAt: new Date(),
      };
      this.currentUser.set(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
    return Promise.resolve();
  }

  private generateUid(): string {
    return `user_${Math.random().toString(36).substr(2, 9)}`;
  }
}
