import { Component, OnInit, Input, OnDestroy, Renderer2 } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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

  sortRules: SortRule[] = []
  destroy$ = new Subject();
  _sortRules = new BehaviorSubject<SortRule[]>([]);
  _dataSubject = new BehaviorSubject<any[]>([]);
  _sortedData$: Observable<any[]>;

  constructor() { }

  ngOnInit(): void {
    this._sortedData$ = this._dataSubject.asObservable()
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

}
