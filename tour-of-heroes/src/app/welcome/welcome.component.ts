import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1 class="main-title">{{title}}</h1>
    <hr>
    <div class="center-flex-container">
      <a class="golden-button margin" routerLink="/hallOfFame"> ~ HALL OF FAME ~ </a> 
      <a class="golden-button small-font margin" routerLink="/editor"> ~ ALL HEROES ~</a>
    </div>
  `,
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  title = '~ TOUR OF HEROES ~';
}
