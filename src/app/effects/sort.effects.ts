import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ActionTypes, sortChangedSuccess, loadSortRulesSuccess } from '../actions/sort.actions';
import { mergeMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { getSortRules } from '../reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class SortEffects {

  loadRules = createEffect(() => this.actions$.pipe(
    ofType(ActionTypes.LoadSortRulesBegin),
    mergeMap(() => of(JSON.parse(localStorage.getItem('sortRules')))
      .pipe(
        tap(console.log),
        map((rules) => rules || []),
        map((rules) => loadSortRulesSuccess({ rules }))
      )
    )
  ))

  saveToLocalStorage$ = createEffect(() => this.actions$.pipe(
    ofType(ActionTypes.UpdateSortRulesBegin),
    mergeMap(() => this.store.select(getSortRules)
      .pipe(
        tap((rules) => localStorage.setItem('sortRules', JSON.stringify(rules))),
        map(() => sortChangedSuccess()),
      )
    ),
  ));

  constructor(
    private actions$: Actions,
    private store: Store
  ) {
  }
}