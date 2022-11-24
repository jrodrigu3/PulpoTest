import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Movie } from "src/app/core/interfaces/movie.interface";
import { moviesSucced } from "../actions/home.actions";
export interface HomePageState {
    searchCriteria: string;
    movies: Movie[]
}
export const initialState: HomePageState = {
    searchCriteria: "",
    movies: []
};

const homePageReducers = createReducer(initialState, on(moviesSucced, (state, { movies }) => ({
    ...state, movies
})));

export const reducer = (state: HomePageState | undefined, action: Action): HomePageState =>
    homePageReducers(state, action);

export const selectHomePageState = createFeatureSelector<HomePageState>("homePage");
export const selectMovies = createSelector(selectHomePageState, (state) => state.movies);