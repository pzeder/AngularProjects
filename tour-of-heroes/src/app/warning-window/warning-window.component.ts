import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-warning-window',
  standalone: true,
  imports: [],
  template: `
  <div class="backdrop" (click)="response.emit(false)"> 
    <div class="warning-window"> 
      <p class="regular-text"> {{warning}} </p>
      <button class="golden-button tiny-button" style="margin-bottom: 1.5vw" (click)="response.emit(true)"> OK </button>
    </div>
  </div>
  `,
  styleUrl: './warning-window.component.css'
})
export class WarningWindowComponent {
  @Input() warning!: string;

  @Output() response = new EventEmitter<boolean>();
}
