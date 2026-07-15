import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-ring',
  templateUrl: './progress-ring.component.html',
  styleUrls: ['./progress-ring.component.scss'],
})
export class ProgressRingComponent implements OnInit {
  @Input() progress: number = 0;
  @Input() radius: number = 45;
  @Input() strokeWidth: number = 4;
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() color: string = '#00ff88';

  circumference: number = 0;
  strokeDashoffset: number = 0;

  ngOnInit(): void {
    this.circumference = 2 * Math.PI * this.radius;
    this.updateProgress();
  }

  ngOnChanges(): void {
    this.updateProgress();
  }

  private updateProgress(): void {
    this.strokeDashoffset = this.circumference - (this.progress / 100) * this.circumference;
  }
}
