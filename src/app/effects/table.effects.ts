import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ActionTypes, sortChangedSuccess, loadSortRulesSuccess } from '../actions/table.actions';
import { mergeMap, map, tap, } from 'rxjs/operators';
import { of, combineLatest } from 'rxjs';
import { getSortRules } from '../reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class SortEffects {

  loadRules = createEffect(() => this.actions$.pipe(
    ofType(ActionTypes.LoadSortRulesBegin),
    map(({tableName}) => tableName),
    mergeMap((tableName) => of([tableName, JSON.parse(localStorage.getItem(tableName)) || []])
      .pipe(
        map(([tableName, rules]) => loadSortRulesSuccess({ tableName, rules }))
      )
    )
  ));

  saveToLocalStorage$ = createEffect(() => this.actions$.pipe(
    ofType(ActionTypes.UpdateSortRulesBegin),
    map(({tableName}) => tableName),
    mergeMap((tableName) => combineLatest(of(tableName), this.store.select(getSortRules(tableName)))
      .pipe(
        tap(([tableName, rules]) => localStorage.setItem(tableName, JSON.stringify(rules))),
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