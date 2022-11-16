import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, Observable, of } from "rxjs";
import { Movie } from "src/app/core/interfaces/movie.interface";
import { MovieService } from "src/app/modules/principal-page/services/movie.service";
import { homeActions } from "../actions";
import { RootState } from "../reducers";

@Injectable()
export class HomeEffects {

  public constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private service: MovieService
  ) { }

  public movieRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.moviesRequested),
      exhaustMap(action => {
        const obSer: Observable<Movie[]> = this.service.getMoviesTest('movie', action.criteria);
        // return [homeActions.moviesSucced(null)]
        return obSer.pipe(
          map(movies => {
            return homeActions.moviesSucced({ movies });
          }),
          catchError((error: { message: string }) => of(homeActions.moviesFailed({ error: error.message })))
        );
      })
    )
  );
}

/* 

  return service.pipe(
          map(movies => {
            return homeActions.moviesSucced({ movies });
          }),
          catchError((error: { message: string }) => of(homeActions.moviesFailed({ error: error.message })))
        );
        
*/