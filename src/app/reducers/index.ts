import {
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromBreweries from './breweries.reducer';
import * as fromTable from './table.reducer';

export interface State {
  breweries: fromBreweries.BreweriesState;
  tables: fromTable.TableStates;
}

export const reducers: ActionReducerMap<State> = {
  breweries: fromBreweries.reducer,
  tables: fromTable.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getBreweryState = (state: State) => state.breweries

export const getAllBrewery = createSelector(
  getBreweryState,
  fromBreweries.getBreweries,
);

export const getSortState = (state: State) => state.tables;

export const getSortRules = (tableName: string) => createSelector(
  getSortState,
  (tables) => tables[tableName].rules,
);

export const getSortRulesByColumn = (tableName: string, column: string) => createSelector(
  getSortState,
  (tables) => tables[tableName].rules.find(rule => rule.column === column),
)