import { inject, Injectable } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { DataResponse, Search } from 'src/app/core/interfaces/movie.interface';
import { StateService } from 'src/app/core/services/state-service.service';
import { SwalUtils } from 'src/app/core/utils/swal-util';
import { LocalStorageService } from './localStorage.service';
import { MovieService } from './movie.service';

export interface Movie {
  imdbID?: string;
  Year: string;
  Type: string;
  Title: string;
  Poster: string;
  favorite: boolean;
}
export interface MovieState {
  movies: Array<Movie>;
}
const initialState: MovieState = {
  movies: []
};

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService extends StateService<MovieState> {

  public searchMovies: Array<Search>;
  private unsubcribe$ = new Subject<void>();


  private storageService = inject(LocalStorageService);
  private movieService = inject(MovieService);

  private _pageNum = 1;
  private _movieName: string;

  constructor() {
    super(initialState);
  }


  public get selectMovies() {
    return this.select(s => s.movies);
  }

  public getMovies(movieName: string): void {
    const fav: Search[] = this.storageService.getMovies();
    this.movieService.getMovies('movie', movieName).pipe(takeUntil(this.unsubcribe$))
      .subscribe((data => {
        console.log(data);
        if (!!data) {
          if (!!data.Search) {
            this.searchMovies = data.Search;
            this._movieName = movieName;
            this._pageNum = 1;
            const ms: Search[] = this.findFavoriteInStorage(fav);
            this.setState({ movies: [...ms] });
          } else {
            SwalUtils.mensajeErrorCorrect('error', 'Oops...', 'No se encontró la pelicula');
            this.setState({ movies: [] });
          }
        } else {
          this.setState({ movies: [] });
        }
      }));
  }

  public findFavoriteInStorage(fav: Search[]): Search[] {
    return this.searchMovies.map(movie => {
      const found = !!fav.find((favorite: Search) => favorite.imdbID === movie.imdbID);
      movie.favorite = found;
      return movie;
    });
  }

  public findOneMovie(movieName: string) {
    this._movieName = movieName;
    this.getMovies(movieName)
  }

  public subscritionsDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  public onScrollDown(isHome: boolean): void {
    if (isHome && !!this.searchMovies) {
      this._pageNum++;
      this.movieService.getMoviesPage('movie', this._movieName, this._pageNum).
        pipe(takeUntil(this.unsubcribe$)).subscribe((data: DataResponse) => {
          if (!!data) {
            if (!!data.Search) {
              const fav: Search[] = this.storageService.getMovies();
              this.searchMovies = [...this.searchMovies, ...data.Search];
              debugger;
              this.searchMovies = this.findFavoriteInStorage(fav);
              this.setState({ movies: [...this.searchMovies] });
            }
            else {
              SwalUtils.mensajeErrorCorrect('error', 'Oops...', 'No hay más peliculas');
            }
          }
        });;
    }
  }



}
