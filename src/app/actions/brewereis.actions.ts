import { createAction, props } from "@ngrx/store";
import { Brewery } from "../interfaces/brewery";

export enum ActionTypes {
  LoadBreweriesBegin = "[Breweries] Load breweries begin",
  LoadBreweriesSuccess = "[Breweries] Load breweries success",
  LoadBreweriesFailure = "[Breweries] Load breweries failure"
}

export const loadBreweriesBegin = createAction(ActionTypes.LoadBreweriesBegin);

export const loadBreweriesSucess = createAction(
  ActionTypes.LoadBreweriesSuccess,
  props<{breweries: Brewery[]}>(),
);

export const loadBreweriesFailure = createAction(
  ActionTypes.LoadBreweriesFailure,
  props<{error: any}>(),
);