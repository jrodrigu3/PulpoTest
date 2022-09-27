import { Component, inject, Input, OnInit } from '@angular/core';
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


  constructor() { }

  ngOnInit(): void {
    this.getIcon();
  }

  getIcon(): string {
    return this.movie?.favorite ? 'heart-solid.svg' : 'heart.svg';
  }

  setFavorite(): void {
    const isFavorite = this.movie.favorite;
    this.getIcon();
    this.movie.favorite = !isFavorite;
    this.storageService.addOrRemoveFavorite(this.movie);
  }
}
