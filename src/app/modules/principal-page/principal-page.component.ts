import { Component, inject, OnInit } from '@angular/core';
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

  /**
   * Metodo para inicializar el componente
   */
  ngOnInit(): void {
    this.movieService.getMovies('movie', 'batman').subscribe((data: DataResponse) => {
      if (!!data) {
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

}
