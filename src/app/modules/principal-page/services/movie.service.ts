import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataResponse } from 'src/app/core/interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

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
  getMovies(type: string = 'movie', name: string): Observable<DataResponse> {
    return this.http.get<DataResponse>(`${this.urlService}?apikey=${this.apiKey}&s=${name}&type=${type}`);
  }

  /**
   * Metodo para obtener peliculas por paginado
   * @param type Tipo de pelicula
   * @param name Nombre de la pelicula
   * @param pagine paginacion de la pelicula
   * @returns
   */
  getMoviesPage(type: string = 'movie', name: string, pagine: number) {
    return this.http.get<DataResponse>(`${this.urlService}?apikey=${this.apiKey}&s=${name}&type=${type}&page=${pagine}`);
  }


}
