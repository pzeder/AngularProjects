import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeroComponent } from './hero/hero.component';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';

export const routes: Routes = [
    { path: '', component: WelcomeComponent, title: 'Home'},
    { path: 'editor', component: HeroesComponent, title: 'Editor'},
    { path: 'hero/:id', component: HeroComponent, title: 'Hero'},
    { path: 'hallOfFame', component: HallOfFameComponent, title: 'Hall of Fame'}
];
