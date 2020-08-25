import * as SortActions from "../actions/sort.actions";
import { SortRule } from '../click-up-table/click-up-table.component'
import { createReducer, on, Action } from "@ngrx/store";

export interface SortState {
  rules: SortRule[];
}

export const initialState: SortState = {
  rules: [],
}

const sortRecucers = createReducer(
  initialState,
  on(SortActions.loadSortRulesBegin, (state => ({ ...state }))),
  on(SortActions.loadSortRulesSuccess, (state, { rules }) => ({ ...state, rules })),
  on(SortActions.sortChangedBegin, (state, { column }) => {
    let index;
    const rules = state.rules.map(rule => ({ ...rule }));
    const found = rules.find((rule, i) => {
      index = i;
      return rule.column === column;
    }); 

    if (!found) return {...state, rules: rules.concat([{ direction: 1, column }]) }

    const origDirection = rules[index].direction;
    
    if (origDirection === 1) {
      rules[index] = { ...rules[index], direction: -1 }
    } else {
      rules.splice(index, 1);
    }
    
    let foo = { ...state, rules }
    return foo
  }),
  on(SortActions.sortChangedSuccess, (state) => ({ ...state }))
);

export function reducer(state: SortState, action: Action) {
  return sortRecucers(state, action);
}





