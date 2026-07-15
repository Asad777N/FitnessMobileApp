import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() duration: number = 60;
  @Input() autoStart: boolean = false;
  @Output() timerComplete = new EventEmitter<void>();
  @Output() timerPaused = new EventEmitter<number>();

  timeRemaining: number = 0;
  isRunning: boolean = false;
  isPaused: boolean = false;
  private timerSubscription?: Subscription;

  ngOnInit(): void {
    this.timeRemaining = this.duration;
    if (this.autoStart) {
      this.start();
    }
  }

  ngOnDestroy(): void {
    this.stop();
  }

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.isPaused = false;

    this.timerSubscription = interval(1000)
      .pipe(
        takeWhile(() => this.timeRemaining > 0)
      )
      .subscribe(() => {
        this.timeRemaining--;
        if (this.timeRemaining === 0) {
          this.isRunning = false;
          this.timerComplete.emit();
        }
      });
  }

  pause(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.isRunning = false;
    this.isPaused = true;
    this.timerPaused.emit(this.timeRemaining);
  }

  resume(): void {
    this.start();
  }

  reset(): void {
    this.stop();
    this.timeRemaining = this.duration;
  }

  private stop(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.isRunning = false;
    this.isPaused = false;
  }

  get displayTime(): string {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
