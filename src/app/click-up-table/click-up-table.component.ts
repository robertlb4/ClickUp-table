import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';

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
  sortRules: SortRule[] = [];

  _filterTerms = new BehaviorSubject<string>('');
  filterTerms$ = this._filterTerms.asObservable()

  _dataSubject = new BehaviorSubject<any[]>([]);
  _filteredData$: Observable<any[]>;

  constructor() { }

  ngOnInit(): void {
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

  addSortRule(column: string) {
    let index;
    let rules = [...this.sortRules];
    const existingColumn = this.sortRules
      .find((rule, i) => {
        index = i;
        return rule.column === column
      });

    if (existingColumn) {
      if (existingColumn.direction > 0) {
        existingColumn.direction = -1;
      } else {
        rules = rules
          .slice(0, index).concat(rules.slice(index+1, rules.length));
      }
    } else {
      rules.push({ column, direction: 1 });
    }
    this.sortRules = rules;
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
