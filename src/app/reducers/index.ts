import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as brewery from './breweries.reducer';
import * as sort from './sort.reducer';

export interface State {
  brewery: brewery.BreweriesState;
  sort: sort.SortState;
}

export const reducers: ActionReducerMap<State> = {
  brewery: brewery.reducer,
  sort: sort.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getBreweryState = (state: State) => state.brewery

export const getAllBrewery = createSelector(
  getBreweryState,
  brewery.getBreweries,
);

export const getSortState = (state: State) => state.sort;

export const getSortRules = createSelector(
  getSortState,
  (state: sort.SortState) => state.rules,
)

export const getSortRulesByColumn = (column: string) => createSelector(
  getSortRules,
  (rules) => rules.find(rule => rule.column === column),
)