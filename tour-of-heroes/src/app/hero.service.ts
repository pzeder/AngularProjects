import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  apiUrl = 'http://localhost:3000/heroes';

  constructor(private httpClient:HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.apiUrl).pipe(
      tap(() => this.messageService.add("HeroService: fetched all heroes"))
    );
  }

  getLegendaryHeroes(): Observable<Hero[]> {
    const url = `${this.apiUrl}?isLegendary=true`;
    return this.httpClient.get<Hero[]>(url).pipe(
      tap(() => this.messageService.add("HeroService: fetched legendary heroes"))
    );
  }

  getHero(id: any): Observable<Hero> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(() => this.messageService.add(`HeroService: Hero [id=${id}] fetched.`))
    );
  }

  addHero(): Observable<any> {
    return this.httpClient.post<Hero>(this.apiUrl, { name: 'New Hero', isLegendary: false }).pipe(
      tap(() => {
        this.messageService.add("HeroService: New Hero added");
      })
    );
  }

  deleteHero(hero: Hero): Observable<any> {
    const url = `${this.apiUrl}/${hero.id}`;
    return this.httpClient.delete<Hero>(url).pipe(
      tap(() => this.messageService.add(`HeroService: Hero [${hero?.name}] deleted.`)),
      catchError((error: HttpErrorResponse) => {
        this.messageService.add(`HeroService: Hero [${hero?.name}] was already deleted.`);
        return throwError(() => new Error(error.message));
      })
    );
  }

  updateHero(hero: Hero, newName: string, newLegendary: boolean): Observable<any> {
    newName = newName.trim();
    const url = `${this.apiUrl}/${hero.id}`;
    const updatedHero: Hero = (newName === '') ? hero : { id: hero.id, name: newName, isLegendary: newLegendary };
    return this.httpClient.put<Hero>(url, updatedHero).pipe(
      tap(() => this.messageService.add(`HeroService: Hero [id=${hero.id}] name set to "${newName}" and status set to ${newLegendary ? 'LEGENDARY' : 'NORMAL'}`))
    );
  }
}
