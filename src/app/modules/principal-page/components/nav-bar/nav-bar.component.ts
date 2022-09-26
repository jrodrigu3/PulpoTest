import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  /**
   * form control del buscador
   */
  navBar = new FormControl();

  /**
   * Propiedad de salida que emite el de un pelicula buscada
   */
  @Output() eventMovie: EventEmitter<string> = new EventEmitter();

  /**
   * Metodo para comparatir el nombre de la pelicula, con el componente padre
   */
  public shareNameMovie(): void {
    const { value } = this.navBar;
    if (!!value) {
      this.eventMovie?.emit(value);
    }
  }

}
