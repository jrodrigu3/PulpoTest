import { Action, createReducer } from "@ngrx/store";
export interface HomePageState {
    searchCriteria: string;
}
export const initialState: HomePageState = {
    searchCriteria: "",
};

const homePageReducers = createReducer(initialState);

export const reducer = (state: HomePageState | undefined, action: Action): HomePageState =>
    homePageReducers(state, action);