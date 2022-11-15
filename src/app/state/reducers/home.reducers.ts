import { Action, createFeatureSelector, createReducer, createSelector } from "@ngrx/store";
import { Movie } from "src/app/core/interfaces/movie.interface";
export interface HomePageState {
    searchCriteria: string;
    movies: Movie[]
}
export const initialState: HomePageState = {
    searchCriteria: "",
    movies: []
};

const homePageReducers = createReducer(initialState);

export const reducer = (state: HomePageState | undefined, action: Action): HomePageState =>
    homePageReducers(state, action);

export const selectHomePageState = createFeatureSelector<HomePageState>("homePage");
export const selectMovies = createSelector(selectHomePageState, (state) => state.movies);