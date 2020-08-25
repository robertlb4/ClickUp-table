import * as SortActions from "../actions/table.actions";
import { SortRule } from '../click-up-table/click-up-table.component'
import { createReducer, on, Action } from "@ngrx/store";

export interface SortState {
  rules: SortRule[];
}
// a map of table names to sorting rules
export interface TableStates {
    [tableName: string]: SortState,
}

export const initialState: TableStates = {}

const sortRecucers = createReducer(
  initialState,
  on(SortActions.loadSortRulesBegin, ((state, action) => ({
    ...state,
    [action.tableName]: { rules: ([] as SortRule[]) },
  }))),
  on(SortActions.loadSortRulesSuccess, (state, { tableName, rules }) => ({
    ...state, 
    [tableName]: { rules: [...rules] },
  })),
  on(SortActions.sortChangedBegin, (state, { tableName, column }) => {
    let index;
    const rules = state[tableName].rules.map(rule => ({ ...rule }));
    const found = rules.find((rule, i) => {
      index = i;
      return rule.column === column;
    });
    
    //add new rules as one does not exist for the column
    if (!found) return {
      ...state,
      [tableName]: { rules: rules.concat([{ direction: 1, column }]) }
    }

    const origDirection = rules[index].direction;
    
    // invert the sort order or remove rule form the list
    if (origDirection === 1) {
      rules[index] = { ...rules[index], direction: -1 }
    } else {
      rules.splice(index, 1);
    } 
    return {
      ...state, 
      [tableName]: { rules } 
    };
  }),
  on(SortActions.sortChangedSuccess, (state) => ({ ...state }))
);

export function reducer(state: TableStates, action: Action) {
  return sortRecucers(state, action);
}





