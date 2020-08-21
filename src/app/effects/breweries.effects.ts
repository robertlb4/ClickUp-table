import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { BreweryService } from '../brewery-list/brewery.service'
import { ActionTypes, loadBreweriesSucess } from '../actions/brewereis.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class BreweryEffects {

  loadBreweries$ = createEffect(() => this.actions$.pipe(
    ofType(ActionTypes.LoadBreweriesBegin),
    mergeMap(() => this.breweryService.loadBreweries()
      .pipe(
        tap(console.log),
        map(breweries => ( loadBreweriesSucess({ breweries, }))),
        catchError(() => EMPTY)
      ),
    ),
  ));

  constructor(
    private actions$: Actions,
    private breweryService: BreweryService,
  ) {}
}