import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as brewery from './breweries.reducer'; 

export interface State {
  brewery: brewery.BreweriesState;
}

export const reducers: ActionReducerMap<State> = {
  brewery: brewery.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getBreweryState = (state: State) => state.brewery

export const getAllBrewery = createSelector(
  getBreweryState,
  brewery.getBreweries,
);