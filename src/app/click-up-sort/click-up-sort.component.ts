import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColumnInfo, SortRule } from '../click-up-table/click-up-table.component';
import { Store } from '@ngrx/store';
import { getSortRulesByColumn } from '../reducers'
import { sortChangedBegin } from '../actions/table.actions'
import { Observable } from 'rxjs';

@Component({
  selector: 'clickUpSort, [clickUpSort]',
  templateUrl: './click-up-sort.component.html',
  styleUrls: ['./click-up-sort.component.scss']
})
export class ClickUpSortComponent implements OnInit {
  @Input() tableName = 'table';
  @Input() column: ColumnInfo;
  @Output() sort = new EventEmitter();

  rule$: Observable<SortRule>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.rule$ = this.store.select(getSortRulesByColumn(this.tableName, this.column.dataKey));
  }

  handleClick(column: string) {
    this.store.dispatch(sortChangedBegin({ tableName: this.tableName, column }));
    this.sort.emit(column);
  }

}
