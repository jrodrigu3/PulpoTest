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

  private movieService = inject(MovieService);
  private storageService = inject(LocalStorageService);


  public search: Array<Search>;

  showButton = false;

  private _scrollHeight = 200;
  private pageNum = 1;
  private _movieName: string;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  /**
   * Metodo para inicializar el componente
   */
  ngOnInit(): void {
    this.getMovies('superman');
  }

  /**
   * Metodo para peliculas
   */
  public getMovies(movieName: string): void {
    this.movieService.getMovies('movie', movieName).subscribe((data: DataResponse) => {
      if (!!data) {
        this.pageNum = 1;
        this.search = data.Search;
        this.moviesData(this.search);
      }
    });
  }

  private moviesData(movie: Array<Search>): void {
    const fav = this.storageService.getMovies();
    movie.forEach(mov => {
      const found = !!fav.find((favorite: Search) => favorite.imdbID === mov.imdbID);
      mov.favorite = found;
    });
  }

  public onMovie(evento: any): void {
    this._movieName = evento;
    this.getMovies(evento)
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > this._scrollHeight;
  }

  onScrollDown(): void {
    this.pageNum++;
    this.movieService.getMoviesPage('movie', this._movieName, this.pageNum).subscribe((data: DataResponse) => {
      if (!!data) {
        this.search = [...this.search, ...data.Search];
        this.moviesData(this.search);
      }
    });;
  }

}
