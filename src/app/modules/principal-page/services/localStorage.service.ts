import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Search } from 'src/app/core/interfaces/movie.interface';

const FAVORITES: string = 'myFavorites';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private moviesFavSubject = new BehaviorSubject<any>(null);
  moviesFav$ = this.moviesFavSubject.asObservable();

  constructor() {
    this.inicializarLocalStorage();
  }

  private inicializarLocalStorage(): void {
    const dataTest = JSON.parse(localStorage.getItem(FAVORITES) || '[]');
    if (dataTest.length <= 0) {
      localStorage.setItem(FAVORITES, JSON.stringify([]));
    }
    this.getMovies();
  }

  public getMovies(): any {
    const movieFav = JSON.parse(localStorage.getItem(FAVORITES) || '[]');
    this.moviesFavSubject.next(movieFav);
    return movieFav;
  }

  addOrRemoveFavorite(movie: Search): void {
    const { imdbID } = movie;
    const currentsFav = this.getMovies();
    const found = !!currentsFav.find((fav: Search) => fav.imdbID === imdbID);
    found ? this.addRemove(imdbID) : this.addFovorite(movie);
  }

  private addFovorite(character: Search): void {
    const currentsFav = this.getMovies();
    localStorage.setItem(FAVORITES, JSON.stringify([...currentsFav, character]));
    this.moviesFavSubject.next([...currentsFav, character]);
  }

  private addRemove(imdbID: string): void {
    const currentsFav = this.getMovies();
    const characters = currentsFav.filter((fav: Search) => fav.imdbID !== imdbID);
    localStorage.setItem(FAVORITES, JSON.stringify([...characters]));
    this.moviesFavSubject.next([...characters]);
  }


}
