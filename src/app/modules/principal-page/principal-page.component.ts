import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, inject, OnInit } from '@angular/core';
import { DataResponse, Search } from 'src/app/core/interfaces/movie.interface';
import { LocalStorageService } from './services/localStorage.service';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.scss']
})
export class PrincipalPageComponent implements OnInit {

  /**
   * Injección del service de movie
   */
  private movieService = inject(MovieService);
  /**
   * Injeccion del servicio de storage
   */
  private storageService = inject(LocalStorageService);
  /**
   * Array de peliculas encontradas
   */
  public search: Array<Search>;
  /**
   * Variable para lavisualización del boton
   */
  public showButton = false;
  /**
   * Variable para el alto del escroll
   */
  private _scrollHeight = 200;
  /**
   * variable primada para la pagina inicial
   */
  private _pageNum = 1;
  /**
   * Variable privada para el nombre de la pelicula a buscar
   */
  private _movieName: string;

  /**
   * Metodo contructor
   * @param document document
   */
  constructor(@Inject(DOCUMENT) private document: Document) { }

  /**
   * Metodo para inicializar el componente
   */
  ngOnInit(): void {
    this.getMovies('superman');
  }

  /**
   * Metodo para buscar peliculas
   * @param movieName variable que contiene el nombre de la pelicula
   */
  public getMovies(movieName: string): void {
    this.movieService.getMovies('movie', movieName).subscribe((data: DataResponse) => {
      if (!!data) {
        this._movieName = movieName;
        this._pageNum = 1;
        this.search = data.Search;
        this.moviesData(this.search);
        if (this.document.documentElement.scrollHeight > 910 && this.search.length <= 10) {
          this.onScrollDown();
        };
      };
    });
  }

  /**
   * metodo para add propiedad favorite
   * @param movie contiene la listas de peliculas encontradas
   */
  private moviesData(movie: Array<Search>): void {
    const fav = this.storageService.getMovies();
    movie.forEach(mov => {
      const found = !!fav.find((favorite: Search) => favorite.imdbID === mov.imdbID);
      mov.favorite = found;
    });
  }

  /**
   *
   * @param movieName nombre de la pelicula
   */
  public onMovie(movieName: string): void {
    this._movieName = movieName;
    this.getMovies(movieName)
  }

  /**
   * Metodo para subir al comienzo de scroll
   */
  public onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  /**
   * Decorador hostListener
   */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > this._scrollHeight;
  }

  /**
   * Metodo para buscar peliculas con el scroll - Lazy loading
   */
  onScrollDown(): void {
    this._pageNum++;
    this.movieService.getMoviesPage('movie', this._movieName, this._pageNum).subscribe((data: DataResponse) => {
      if (!!data) {
        if (!!data.Search) {
          this.search = [...this.search, ...data.Search];
          this.moviesData(this.search);
        }
        else {
          console.log('Error');
        }
      }
    });;
  }
}
