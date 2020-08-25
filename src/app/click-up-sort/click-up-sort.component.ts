import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColumnInfo, SortRule } from '../click-up-table/click-up-table.component';
import { Store } from '@ngrx/store';
import { getSortRulesByColumn } from '../reducers'
import { sortChangedBegin } from '../actions/sort.actions'
import { Observable } from 'rxjs';

@Component({
  selector: 'clickUpSort, [clickUpSort]',
  templateUrl: './click-up-sort.component.html',
  styleUrls: ['./click-up-sort.component.scss']
})
export class ClickUpSortComponent implements OnInit {
  @Input() column: ColumnInfo;
  @Output() sort = new EventEmitter();

  rule$: Observable<SortRule>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.rule$ = this.store.select(getSortRulesByColumn(this.column.dataKey));
  }

  handleClick(column: string) {
    this.store.dispatch(sortChangedBegin({ column }));
    this.sort.emit(column);
  }

}
