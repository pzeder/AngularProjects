import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroesComponent } from "./heroes/heroes.component";
import { NgFor } from '@angular/common';
import { MessageComponent } from "./message/message.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroesComponent, NgFor, MessageComponent],
  template: `
    <router-outlet> </router-outlet>
    <hr>
    <app-message> </app-message>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {}
