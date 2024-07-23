import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from '../message.service';
import { HeroService } from '../hero.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  template: `
  <div *ngIf="hero">
    <h1 class="main-title"> ~ {{hero.name}} ~ </h1>
    <hr>
    <div class="center-align-container">
      <div>
        <div style="display: flex">
          <label class="regular-text golden margin"> ID: </label> 
          <div class="regular-text margin"> {{hero.id}} </div>
        </div>
        <label class="regular-text golden" for="name"> Name: </label>
        <input class="regular-text" id="name" [(ngModel)]="inputHeroName" (keyup.enter)="updateHero(hero)"> 
         <br> <br>
        <label class="regular-text golden"> Legendary? </label> <input type="checkbox" class="margin" style="transform: scale(2)" [(ngModel)]="inputLegendary"> <br> <br>
      </div>
      <button class="golden-button tiny-button margin" (click)="updateHero(hero)"> Save </button>
    </div>
    <hr class="thin">
    <div class="center-align-container">
      <a routerLink="/editor">
        <button class="golden-button tiny-button"> Back </button>
      </a>
    <div>
  </div>
  `,
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  hero: Hero | undefined;
  inputHeroName!: string;
  inputLegendary!: boolean;

  constructor(private route: ActivatedRoute, private router: Router, public heroService: HeroService, private messageService: MessageService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.inputHeroName = hero.name;
        this.inputLegendary = hero.isLegendary;
      });
  }

  updateHero(hero: Hero): void {
    this.heroService.updateHero(hero, this.inputHeroName, this.inputLegendary).subscribe(res => this.hero = res);
  }
}
