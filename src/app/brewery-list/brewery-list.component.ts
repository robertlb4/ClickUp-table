import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as breweryActions from '../actions/brewereis.actions';
import { getAllBrewery } from '../reducers';
import { ColumnInfo } from '../click-up-table/click-up-table.component';


@Component({
  selector: 'brewery-list',
  templateUrl: './brewery-list.component.html',
  styleUrls: ['./brewery-list.component.scss'],
})
export class BreweryListComponent implements OnInit {

  columns: ColumnInfo[] = [
    { headerText: 'Name', dataKey: 'name', sortable: true },
    { headerText: 'Type', dataKey: 'type', sortable: true },
    { headerText: 'State', dataKey: 'state', sortable: true },
    { headerText: 'Website', dataKey: 'website', sortable: false },
  ];

  breweries$ = this.store.select(getAllBrewery)

  constructor(
    private store: Store,

    ) { }

  ngOnInit(): void { 
    this.store.dispatch(breweryActions.loadBreweriesBegin())
  }

}
