import { Component } from '@angular/core';
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';
import { RouterModule } from '@angular/router';
import { WarningWindowComponent } from "../warning-window/warning-window.component";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [FormsModule, CommonModule, HeroComponent, RouterModule, WarningWindowComponent],
  template: `
  <h1 class="main-title"> ~ HERO EDITOR ~</h1>
  <hr>
  <div class="center-container" *ngFor="let hero of heroes">
    <div>
      <a class="hero-name" [routerLink]="['/hero', hero.id]"> ~ {{hero.name}} </a>
      <button class="golden-button micro-button red" *ngIf="deletable" (click)="deleteTargetHero = hero"> delete </button>
    </div>
  </div>
  <div class="center-container">
    <button class="golden-button tiny-button margin" (click)="addNewHero()"> + Add New Hero</button>
    <div class="margin" style="display: flex" *ngIf="heroes.length > 0">
      <label class="regular-text golden margin"> Enable Deleting </label>
      <label class="switch">
        <input type="checkbox" id="toggle" [(ngModel)]="deletable">
        <span class="slider"></span>
      </label>
    </div>
  </div>
  <hr class="thin">
  <div class="center-align-container">
      <a routerLink="/">
        <button class="golden-button tiny-button"> Back </button>
      </a>
    <div>
  <app-warning-window *ngIf="deleteTargetHero" [warning]="'Deleting ' + deleteTargetHero.name + ' now?'" (response)="handleResponse($event)"></app-warning-window>
`,
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes: Hero[] = [];
  selectedHeroId: number = -1;
  deletable: boolean = false;
  deleteTargetHero: Hero | undefined;

  constructor(public heroService: HeroService) {}

  ngOnInit(): void {
    this.fetchHeroes();
  }

  fetchHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  addNewHero(): void {
    this.heroService.addHero().subscribe(
      res => this.heroes.push(res)
    );
  }

  deleteHero(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe(
      res => this.heroes = this.heroes.filter(h => h.id !== res.id)
    );
  }

  handleResponse(confirm: boolean): void {
    if (confirm && this.deleteTargetHero) {
      this.deleteHero(this.deleteTargetHero);
    }
    this.deleteTargetHero = undefined;
  }
}
