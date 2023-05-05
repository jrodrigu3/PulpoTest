import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localStorage.service';
import { movieSaved } from 'src/app/core/interfaces/movie.interface';
import { SwalUtils } from 'src/app/core/utils/swal-util';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent {


  movieForm = new FormGroup({
    name: new FormControl(
      "",
      Validators.compose([Validators.required])
    ),
    year: new FormControl(
      0,
      Validators.compose([Validators.required, Validators.min(1)])
    ),
    urlImage: new FormControl("", Validators.compose([Validators.required])),
  });

  constructor(
    private storage: LocalStorageService,
    private _router: Router
  ) { }

  public saveMovie(): void {
    if (this.movieForm.valid) {
      this._router.navigate(['/home']);
      const moviesSaved: movieSaved[] = this.storage.getMoviesSaved();
      let maxImdbID = 0;
      if (moviesSaved.length > 0)
        maxImdbID = Math.max(...moviesSaved.map(movie => movie.imdbID)) + 1;
      const { year, name, urlImage } = this.movieForm.value;
      const movieToSave: movieSaved = {
        imdbID: maxImdbID,
        year,
        name,
        urlImage,
        favorite: false
      };
      SwalUtils.mensajeSaved();
      this.storage.saveMovie(movieToSave);
    } else
      this.movieForm.markAllAsTouched();
  }

}
