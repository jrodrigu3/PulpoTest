import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataResponse, Search } from 'src/app/core/interfaces/movie.interface';
import { LocalStorageService } from './services/localStorage.service';
import { MovieService } from './services/movie.service';
import Swal from 'sweetalert2'
import { SwalUtils } from 'src/app/core/utils/swal-util';
import { ActivatedRoute } from '@angular/router';
import { ERoutes } from 'src/app/core/enum/tipoOperacion.enum';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.scss']
})
export class PrincipalPageComponent implements OnInit, OnDestroy {

  /**
   * Injección del service de movie
   */
  private movieService = inject(MovieService);
  /**
   * Injeccion del servicio de storage
   */
  private storageService = inject(LocalStorageService);
  /**
   * Injeccion del servicio de storage
   */
  private _route = inject(ActivatedRoute);
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
   * Variable privada para el nombre de la pelicula a buscar
   */
  public isWishList: boolean;

  /**
   * define arreglo de subscripciones que maneja todas las subscripciones del componente
   */
  private _arraySubscriptors: Array<Subscription> = [];

  /**
   * Metodo contructor
   * @param document document
   */
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.isWishList = this._route.snapshot?.url[0]?.path === ERoutes.wishList;
  }

  /**
   * Metodo para inicializar el componente
   */
  ngOnInit(): void {
    if (!this.isWishList) {
      this.getMovies('superman');
    } else {
      this.getFavortiesMovies(true);
    }
  }

  /**
   * Metodo encargado de destruir el componente
   */
  ngOnDestroy(): void {
    this._arraySubscriptors.forEach(sub => sub.unsubscribe());
  }

  /**
   * get que obtiene el tipo de operación actual
   */
  get getRoutWishList() {
    return this._route.snapshot.url[1].path;
  }

  /**
 * get utilizado para saber si el tipo de operacion es crear
 */
  get isCrear() {
    return this.getRoutWishList === ERoutes.wishList;
  }
  /**
   * Metodo para buscar peliculas
   * @param movieName variable que contiene el nombre de la pelicula
   */
  public getMovies(movieName: string): void {
    const movieSub: Subscription = this.movieService.getMovies('movie', movieName).subscribe((data: DataResponse) => {
      if (!!data) {
        if (!!data.Search) {
          this._movieName = movieName;
          this._pageNum = 1;
          this.search = data.Search;
          this.moviesData(this.search);
          if (this.document.documentElement.scrollHeight > 910 && this.search.length <= 10) {
            this.onScrollDown();
          };
        } else {
          SwalUtils.mensajeErrorCorrect('error', 'Oops...', 'No se encontró la pelicula');
        }
      }
    });
    this._arraySubscriptors.push(movieSub);
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
  public onScrollDown(): void {
    if (!this.isWishList) {
      this._pageNum++;
      const moviePageSub: Subscription = this.movieService.getMoviesPage('movie', this._movieName, this._pageNum).subscribe((data: DataResponse) => {
        if (!!data) {
          if (!!data.Search) {
            this.search = [...this.search, ...data.Search];
            this.moviesData(this.search);
          }
          else {
            SwalUtils.mensajeErrorCorrect('error', 'Oops...', 'No hay más peliculas');
          }
        }
      });;
      this._arraySubscriptors.push(moviePageSub);
    }
  }

  /**
   * Obtiene las peliculas favoritas del local storage
   */
  public getFavortiesMovies(event: boolean = false): void {
    if (event && this.isWishList) this.search = this.storageService.getMovies();
  }
}
