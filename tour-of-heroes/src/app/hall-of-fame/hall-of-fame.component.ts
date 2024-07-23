import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hall-of-fame',
  standalone: true,
  imports: [RouterModule, NgFor],
  template: `
  <h1 class="main-title"> ~ HALL OF FAME ~</h1>
  <hr>
  <div class="center-container" *ngFor="let hero of legends">
    <div class="hero-name"> ~ {{hero.name}} </div>
  </div>
  <hr class="thin">
  <div class="center-align-container">
    <a routerLink="/">
      <button class="golden-button tiny-button"> Back </button>
    </a>
  <div>
  `,
  styleUrl: './hall-of-fame.component.css'
})
export class HallOfFameComponent {
  legends: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.fetchLegendaryHeroes();
  }

  fetchLegendaryHeroes(): void {
    this.heroService.getLegendaryHeroes().subscribe(legends => this.legends = legends);
  }
}
