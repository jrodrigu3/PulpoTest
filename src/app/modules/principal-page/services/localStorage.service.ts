import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { movieSaved, Search } from 'src/app/core/interfaces/movie.interface';

const FAVORITES: string = 'myFavorites';
const SAVED: string = 'moviesSaved';
const ONE_MOVIE: string = 'oneMovie';

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
    const dataTestSaved = JSON.parse(localStorage.getItem(SAVED) || '[]');
    const dataOneMovie = JSON.parse(localStorage.getItem(ONE_MOVIE) || '[]');
    if (dataTest.length <= 0) {
      localStorage.setItem(FAVORITES, JSON.stringify([]));
    }
    if (dataTestSaved.length <= 0) {
      localStorage.setItem(SAVED, JSON.stringify([]));
    }
    if (dataOneMovie.length <= 0) {
      localStorage.setItem(ONE_MOVIE, JSON.stringify([]));
    }
    this.getMovies();
  }

  public getMovies(): any {
    const movieFav = JSON.parse(localStorage.getItem(FAVORITES) || '[]');
    this.moviesFavSubject.next(movieFav);
    return movieFav;
  }

  public getMoviesSaved(): any[] {
    const movieSaved = JSON.parse(localStorage.getItem(SAVED) || '[]');
    // this.moviesFavSubject.next(movieSaved);
    return movieSaved;
  }

  public getOneMoviesSaved(): any {
    const movieSaved = JSON.parse(localStorage.getItem(ONE_MOVIE) || '[]');
    return movieSaved;
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

  public saveMovie(movie: movieSaved): void {
    const currentsFav = this.getMoviesSaved();
    localStorage.setItem(SAVED, JSON.stringify([...currentsFav, movie]));
    // this.moviesFavSubject.next([...currentsFav, character]);
  }

  public saveOneMovie(movie: Search): void {
    localStorage.setItem(ONE_MOVIE, JSON.stringify([movie]));
  }

  public checkOneMovie(idMovie: string): Search | undefined {
    const oneMovie: Search[] = this.getOneMoviesSaved();
    return oneMovie.find(movie => movie.imdbID == idMovie);
  }

}
