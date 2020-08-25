import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getSortRules } from '../reducers';
import { loadSortRulesBegin } from '../actions/sort.actions'

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
export class ClickUpTableComponent implements OnInit, OnDestroy {
  @Input() columns: ColumnInfo[];
  @Input() set data(value: any[]) {
    this._dataSubject.next(value);
  }

  destroy$ = new Subject();
  sortRules: Observable<SortRule[]> = this.store.select(getSortRules);

  _filterTerms = new BehaviorSubject<string>('');
  filterTerms$ = this._filterTerms.asObservable()

  _dataSubject = new BehaviorSubject<any[]>([]);
  _filteredData$: Observable<any[]>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadSortRulesBegin())
    this._filteredData$ = combineLatest(this._dataSubject.asObservable(), this.filterTerms$)
      .pipe(
        map(([data, searchTerm]) => data.filter(obj => this.filterPredicate(obj, searchTerm))),
      )
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  dropListDropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  filter(text: string) {
    this._filterTerms.next(text);
  }
  
  filterPredicate(data: any[], searchTerm: string) {
    const dataStr = Object.entries(data)
      .reduce((acc, value) => acc + value + '◬', '')
      .toLowerCase();
    return dataStr.indexOf(searchTerm.trim().toLowerCase()) !== -1
  }

}
