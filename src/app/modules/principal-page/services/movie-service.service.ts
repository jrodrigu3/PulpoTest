import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Search } from 'src/app/core/interfaces/movie.interface';
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

  public search: Array<Search>;
  private storageService = inject(LocalStorageService);

  /**
   * Injección del service de movie
   */
  private movieService = inject(MovieService);

  constructor() {
    super(initialState);
  }


  public getMovies(movieName: string): Observable<any> {
    // return this.movieService.getMovies('movie', movieName);
    const fav = this.storageService.getMovies();

    return this.movieService.getMovies('movie', movieName).pipe(map(data => {
      console.log(data);
      if (!!data) {
        if (!!data.Search) {
          /* this._movieName = movieName;
          this._pageNum = 1; */
          this.search = data.Search;
          // this.moviesData(this.search);
          return this.search.map(movie => {
            const found = !!fav.find((favorite: Search) => favorite.imdbID === movie.imdbID);
            movie.favorite = found;
            return movie;
          }
          );
        }
        return [];
      }
      return [];

    }));


  }




}
