import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="center-align-container">
      <h2 class="main-title small-font">Messages</h2>
      <button type="button" class="clear golden-button tiny-button margin"
            (click)="messageService.clear()">Clear</button>
      <br>
      <div>
        <div class="regular-text" *ngFor='let message of messageService.messages'> {{message}} </div>
      </div>
  </div>
  `,
  styleUrl: './message.component.css'
})
export class MessageComponent {
  constructor(public messageService: MessageService) {}
}
