import { Component, OnInit } from '@angular/core';
import { BreweryService } from './brewery.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as breweryActions from '../actions/brewereis.actions';
import { Brewery } from '../interfaces/brewery';
import { getBreweryState, getAllBrewery } from '../reducers';


@Component({
  selector: 'brewery-list',
  templateUrl: './brewery-list.component.html',
  styleUrls: ['./brewery-list.component.scss'],
})
export class BreweryListComponent implements OnInit {

  columns = [
    "Name",
    "Type",
    "State",
    "Website",
  ];
  breweries$: Observable<Brewery[]> = this.store.select(getAllBrewery);

  constructor(private store: Store) { }

  ngOnInit(): void { 
    this.store.dispatch(breweryActions.loadBreweriesBegin())
  }



}
