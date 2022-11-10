import { ModuleWithProviders } from "@angular/core";
import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { PersonState, reducer } from "./person.reducers";

export interface RootState {
  person: PersonState
}
export const reducers: ActionReducerMap<RootState> = {
  person: reducer
}
export const debug = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => reducer(state, action);
};

export const metaReducers: MetaReducer<RootState>[] = [debug];

export const storeDevTools: ModuleWithProviders<any>[] = [StoreDevtoolsModule.instrument({ name: "My Store" })];