import { createAction, props } from "@ngrx/store";
import { Movie } from "src/app/core/interfaces/movie.interface";

export const moviesRequested = createAction("Movies Requested", props<{ criteria: string }>());
export const moviesSucced = createAction("Movies Requested Succed", props<{ movies: Movie[] }>());
export const moviesFailed = createAction("Movies Requested Failed", props<{ error: string }>());