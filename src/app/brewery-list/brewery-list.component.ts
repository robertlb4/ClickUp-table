import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { BreweryService } from './brewery.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as breweryActions from '../actions/brewereis.actions';
import { Brewery } from '../interfaces/brewery';
import { getAllBrewery } from '../reducers';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { buffer, map } from 'rxjs/operators';
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
