import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { BodyMeasurement, DailyStats, ProgressPhoto, WeightChartData } from '../models/progress.model';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private measurementsSubject = new BehaviorSubject<BodyMeasurement[]>([]);
  private photosSubject = new BehaviorSubject<ProgressPhoto[]>([]);
  private statsSubject = new BehaviorSubject<DailyStats[]>([]);

  public measurements$ = this.measurementsSubject.asObservable();
  public photos$ = this.photosSubject.asObservable();
  public stats$ = this.statsSubject.asObservable();

  constructor() {}

  addBodyMeasurement(measurement: Omit<BodyMeasurement, 'id'>): Observable<string> {
    const id = `measurement_${Date.now()}`;
    const newMeasurement = { ...measurement, id } as BodyMeasurement;
    const current = this.measurementsSubject.value;
    this.measurementsSubject.next([...current, newMeasurement]);
    return from(Promise.resolve(id));
  }

  getBodyMeasurements(userId: string): Observable<BodyMeasurement[]> {
    return this.measurements$.pipe(
      map(measurements => measurements.filter(m => m.userId === userId))
    );
  }

  addProgressPhoto(photo: Omit<ProgressPhoto, 'id'>): Observable<string> {
    const id = `photo_${Date.now()}`;
    const newPhoto = { ...photo, id } as ProgressPhoto;
    const current = this.photosSubject.value;
    this.photosSubject.next([...current, newPhoto]);
    return from(Promise.resolve(id));
  }

  getProgressPhotos(userId: string): Observable<ProgressPhoto[]> {
    return this.photos$.pipe(
      map(photos => photos.filter(p => p.userId === userId))
    );
  }

  addDailyStats(stats: DailyStats): Observable<string> {
    const id = `stats_${Date.now()}`;
    const current = this.statsSubject.value;
    this.statsSubject.next([...current, stats]);
    return from(Promise.resolve(id));
  }

  getDailyStats(userId: string, days: number = 30): Observable<DailyStats[]> {
    return this.stats$.pipe(
      map(stats => {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        return stats.filter(s => new Date(s.date) >= startDate);
      })
    );
  }

  getWeightChartData(userId: string): Observable<WeightChartData[]> {
    return this.getBodyMeasurements(userId).pipe(
      map(measurements => 
        measurements.map(m => ({
          date: m.date,
          weight: m.weight,
        }))
      )
    );
  }
}
