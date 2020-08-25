import * as BreweriesActions from "../actions/brewereis.actions";
import { Brewery } from '../interfaces/brewery';
import { createReducer, on, Action } from "@ngrx/store";

export interface BreweriesState {
  breweries: Brewery[];
  loading: boolean;
  error: any;
}

export const initialState: BreweriesState = {
  breweries: [],
  loading: false,
  error: null,
}

const breweriesReducer = createReducer(
  initialState,
  on(BreweriesActions.loadBreweriesBegin, state => ({ ...state, loading: true })),
  on(BreweriesActions.loadBreweriesSucess, (state, action) => ({
    ...state,
    loading: false,
    breweries: action.breweries,
  })),
  on(BreweriesActions.loadBreweriesFailure, (state, action) => ({
    ...state,
    loading: false, 
    error: action.error,
  })),
);

export function reducer(state: BreweriesState, action: Action) {
  return breweriesReducer(state, action);
}

export const getBreweries = (state: BreweriesState) => state.breweries;



