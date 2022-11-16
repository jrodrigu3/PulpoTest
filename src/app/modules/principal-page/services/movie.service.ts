import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { DataResponse, Movie, Search } from 'src/app/core/interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private itemMovie$: BehaviorSubject<{ movies: DataResponse, movieName: string }> = new BehaviorSubject<{ movies: DataResponse, movieName: string }>(null);
  public dataMovie$: Observable<{ movies: DataResponse, movieName: string }> = this.itemMovie$.asObservable();
  /**
   * Injeccion del HttpClient
   */
  private http = inject(HttpClient);

  /**
   * Variable que contiene la key de la api
   */
  private apiKey = 'f30ff9a8';
  /**
   * Url del servicio
   */
  private urlService = 'http://www.omdbapi.com/';

  /**
   * Metodo que trae todas las peliculas
   * @param type Tipo de movies
   * @param name nombre de la pelicula
   */
  getMovies(type: string = 'movie', name: string): void {
    this.http.get<DataResponse>(`${this.urlService}?apikey=${this.apiKey}&s=${name}&type=${type}`).pipe(take(1)).subscribe(response => {
      this.itemMovie$.next({ movies: response, movieName: name });
    });
  }

  getMoviesTest(type: string = 'movie', name: string): Observable<Movie[]> {
    return this.http.get<DataResponse>(`${this.urlService}?apikey=${this.apiKey}&s=${name}&type=${type}`).pipe(take(1), map(response => {
      return response.Search;
    }));
  }

  /**
   * Metodo para obtener peliculas por paginado
   * @param type Tipo de pelicula
   * @param name Nombre de la pelicula
   * @param pagine paginacion de la pelicula
   * @returns
   */
  getMoviesPage(type: string = 'movie', name: string, pagine: number): Observable<DataResponse> {
    return this.http.get<DataResponse>(`${this.urlService}?apikey=${this.apiKey}&s=${name}&type=${type}&page=${pagine}`);
  }

  /**
   * Metodo para buscar una pelicula
   * @param id id de la pelicula a buscar
   * @returns respuesta de la pelicula
   */
  getOneMovies(id: string): Observable<Search> {
    return this.http.get<Search>(`${this.urlService}?apikey=${this.apiKey}&i=${id}`);
  }

}
