import { createAction, props } from "@ngrx/store";
import { SortRule } from "../click-up-table/click-up-table.component";

export enum ActionTypes {
  LoadSortRulesBegin = "[Sort] Load sort rules begin",
  LoadSortRulesSuccess = "[Sort] Load sort rules success",
  UpdateSortRulesBegin = "[Sort] Update sort rules begin",
  UpdateSortSuccess = "[Sort] Update sort success"
}

export const loadSortRulesBegin = createAction(
  ActionTypes.LoadSortRulesBegin,
);

export const loadSortRulesSuccess = createAction(
  ActionTypes.LoadSortRulesSuccess,
  props<{rules: SortRule[]}>(),
)

export const sortChangedBegin = createAction(
  ActionTypes.UpdateSortRulesBegin,
  props<{column: string}>(),
);

export const sortChangedSuccess = createAction(
  ActionTypes.UpdateSortSuccess
)
