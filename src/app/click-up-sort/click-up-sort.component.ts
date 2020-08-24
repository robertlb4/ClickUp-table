import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColumnInfo } from '../click-up-table/click-up-table.component';

@Component({
  selector: 'clickUpSort, [clickUpSort]',
  templateUrl: './click-up-sort.component.html',
  styleUrls: ['./click-up-sort.component.scss']
})
export class ClickUpSortComponent implements OnInit {
  @Input() column: ColumnInfo;
  @Output() sort = new EventEmitter()

  direction;

  constructor() { }

  ngOnInit(): void {}

  handleClick(column: string) {
    this.direction = this.direction === -1 ? undefined : this.direction === 1 ? -1 : 1;

    this.sort.emit(column)
  }

}
