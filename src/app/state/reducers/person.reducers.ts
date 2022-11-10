import { Action, createReducer } from "@ngrx/store";
export interface PersonState {
    name: string;
    lastName: string;
}
export const initialState: PersonState = {
    name: "",
    lastName: ""
};

const personReducers = createReducer(initialState);

export const reducer = (state: PersonState | undefined, action: Action): PersonState =>
    personReducers(state, action);