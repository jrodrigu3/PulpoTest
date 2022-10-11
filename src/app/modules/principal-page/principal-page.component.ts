import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { DataResponse, Search } from 'src/app/core/interfaces/movie.interface';
import { LocalStorageService } from './services/localStorage.service';
import { MovieService } from './services/movie.service';
import Swal from 'sweetalert2'
import { SwalUtils } from 'src/app/core/utils/swal-util';
import { ActivatedRoute } from '@angular/router';
import { ERoutes } from 'src/app/core/enum/tipoOperacion.enum';
import { MovieServiceService } from './services/movie-service.service';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  private stateService = inject(MovieServiceService);
  /**
   * change detection
   */
  private cd = inject(ChangeDetectorRef);
  /**
   * Injeccion del servicio de storage
   */
  private _route = inject(ActivatedRoute);
  /**
   * Array de peliculas encontradas
   */
  public search: Array<Search>;
  /**
   * Array de peliculas encontradas
   */
  public oneMovieDesription: Search;
  /**
   * Variable para lavisualización del boton
   */
  public showButton = false;
  /**
   * Variable para el alto del escroll
   */
  private _scrollHeight = 200;
  /**
   * Variable privada para saber si está en la lista de deseo
   */
  public isWishList: boolean;
  /**
   * Variable privada para saber si está en description
   */
  public isDescription: boolean;
  /**
   * Variable privada para saber el id de la pelicula
   */
  public idMovie: string;
  /**
   * quitar subscripciones
   */
  private unsubcribe$ = new Subject<void>();

  task$: Observable<any>;
  /**
   * Metodo contructor
   * @param document document
   */
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.isWishList = this._route.snapshot?.url[0]?.path === ERoutes.wishList;
    this.isDescription = this._route.snapshot?.url[0]?.path === ERoutes.description;
    this.idMovie = this._route.snapshot?.url[1]?.path;
  }

  /**
   * Metodo para inicializar el componente
   */
  ngOnInit(): void {
    this.task$ = this.stateService.selectMovies;
    this.stateService.getMovies('superman');
  }

  /**
   * Metodo encargado de destruir el componente
   */
  ngOnDestroy(): void {
    this.stateService.subscritionsDestroy();
  }

  /**
   *
   * @param movieName nombre de la pelicula
   */
  public onMovie(movieName: string): void {
    this.stateService.findOneMovie(movieName);
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
    this.stateService.onScrollDown(!this.isDescription && !this.isWishList)
  }

  /**
   * Obtiene las peliculas favoritas del local storage
   */
  public getFavortiesMovies(event: boolean = false): void {
      if (event && this.isWishList) this.search = this.storageService.getMovies();
  }
  /**
   * Metodo para encontrar una pelicula
   */
  getOneMovie() {
    this.movieService.getOneMovies(this.idMovie)
      .pipe(takeUntil(this.unsubcribe$)).subscribe((data: Search) => {
        if (!!data) {
          this.oneMovieDesription = data;
        }
        else {
          SwalUtils.mensajeErrorCorrect('error', 'Oops...', 'No no sé encontró la pelicula seleccionada');
        }
        this.cd.markForCheck();
      });;
  }
}
