import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


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
  @Input() columns: string[];
  @Input() set data(value: Observable<any[][]>|any[]) {
    if (Array.isArray(value)) {
      this._dataSubject.next(value);
    } else {
      value.pipe(takeUntil(this.destroy$)).subscribe(val => this._dataSubject.next(val));
    }
  }

  destroy$ = new Subject();
  _sortRules = new BehaviorSubject<SortRule[]>([]);
  _dataSubject = new BehaviorSubject<any[]>([]);
  _sortedData$: Observable<any[]>;

  constructor() { }

  ngOnInit(): void {
    this._sortedData$ = combineLatest(
      this._sortRules.asObservable(),
      this._dataSubject.asObservable(),
    )
      .pipe(map(([rules, data]) => this.sort(rules, data)));
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
    let rules = this._sortRules.value;
    const existingColumn = rules
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
    return this._sortRules.next(rules);
  }

  sort(sortRules: SortRule[], data: any[]) {
    const sorted = [...data].sort((a, b) => {
      let result = 0;
      for (const rule of sortRules) {
        if (result !== 0) break;

        result = rule.direction*(
          a[rule.column].toString() < b[rule.column].toString()
            ? -1
            : a[ rule.column ].toString() > b[ rule.column ].toString()
              ? 1
              : 0
        );
      }
      return result;
    });
    return sorted
  }

}
