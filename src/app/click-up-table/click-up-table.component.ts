import { Component, OnInit, Input } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getSortRules } from '../reducers';
import { loadSortRulesBegin } from '../actions/table.actions'

export interface ColumnInfo {
  headerText: string;
  dataKey: string;
  sortable: boolean
}

export interface SortRule {
  column: string;
  direction: 1 | -1;
}

@Component({
  selector: 'clickUpTable, table[clickUpTable]',
  templateUrl: './click-up-table.component.html',
  styleUrls: ['./click-up-table.component.scss']
})
export class ClickUpTableComponent implements OnInit {
  @Input() tableName: string = 'table';
  @Input() columns: ColumnInfo[];
  @Input() set data(value: any[]) {
    this._dataSubject.next(value);
  }

  // accept custom filter function
  @Input() filterPredicate: (...args: any[]) => boolean = (data: any[], searchTerm: string) => {
    //Convertes all object values to strings delimnated by '◬' then 
    //seaerches the string for the search term.
    const dataStr = Object.entries(data)
      .reduce((acc, value) => acc + value + '◬', '')
      .toLowerCase();
    return dataStr.indexOf(searchTerm.trim().toLowerCase()) !== -1
  }

  sortRules$: Observable<SortRule[]>;

  _filterTerms = new BehaviorSubject<string>('');
  filterTerms$ = this._filterTerms.asObservable()

  _dataSubject = new BehaviorSubject<any[]>([]);
  _filteredData$: Observable<any[]>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadSortRulesBegin({ tableName: this.tableName }));
    this.sortRules$ = this.store.select(getSortRules(this.tableName));
    
    this._filteredData$ = combineLatest(this._dataSubject.asObservable(), this.filterTerms$)
      .pipe(
        map(([data, searchTerm]) => data.filter(obj => this.filterPredicate(obj, searchTerm))),
      );
  }

  dropListDropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  filter(text: string) {
    this._filterTerms.next(text);
  }

}
