import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Search } from 'src/app/core/interfaces/movie.interface';
import { LocalStorageService } from '../../services/localStorage.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.scss']
})
export class TarjetaComponent implements OnInit {

  private storageService = inject(LocalStorageService);


  /**
   * Input para recibir el formulario con error disparado
   */
  @Input() movie: Search;

  /**
   * Propiedad de salida que emite si se eliminó una pelicula de favorito
   */
  @Output() eventMovie: EventEmitter<boolean> = new EventEmitter();

  /**
   * Metodo on init
   */
  ngOnInit(): void {
    this.getIcon();
  }

  /**
   * Metodo para saber el icono de favorito
   * @returns Retorna el icono correspondiente
   */
  getIcon(): string {
    return this.movie?.favorite ? 'heart-solid.svg' : 'heart.svg';
  }

  /**
   *
   * @returns Metodo para saber la imagen del poster
   */
  getPoster(): string {
    return this.movie?.Poster !== 'N/A' ? this.movie?.Poster : '../../../../../assets/images/noMovie.png';
  }

  /**
   * Metodo que hace el set de favoritos
   */
  setFavorite(): void {
    const isFavorite = this.movie.favorite;
    this.getIcon();
    this.movie.favorite = !isFavorite;
    this.storageService.addOrRemoveFavorite(this.movie);
    this.eventMovie?.emit(true);
  }
}
