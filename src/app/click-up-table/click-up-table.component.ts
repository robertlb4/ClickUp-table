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

  //resize props
  resizeEle: HTMLInputElement
  neighborEle: HTMLInputElement
  pressed;
  startX;
  startWidth;
  neighborWdith;
  resizeMouseMove: () => void;
  resizeMouseUp: () => void;

  sortRules: SortRule[] = []
  destroy$ = new Subject();
  _sortRules = new BehaviorSubject<SortRule[]>([]);
  _dataSubject = new BehaviorSubject<any[]>([]);
  _sortedData$: Observable<any[]>;

  constructor(
    private renderer: Renderer2,
  ) { }

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

  resizeColumn(mouseEvent: MouseEvent) {
    mouseEvent.stopPropagation();
    const target = <HTMLInputElement>mouseEvent.target
    const isRightSide = target.classList.contains('resize-handle-right');

    this.resizeEle = target;
    this.neighborEle = isRightSide
      ? <HTMLInputElement>target.parentElement.nextElementSibling
      : <HTMLInputElement>target.parentElement.previousElementSibling;

    this.pressed = true;
    this.startX = mouseEvent.pageX;
    this.startWidth = target.parentElement.clientWidth;
    this.neighborWdith = this.neighborEle.clientWidth;
    console.log(this.neighborEle, this.neighborWdith)
    this.initResize(isRightSide);
  }

  private initResize(isRightSide: boolean) {
    this.resizeMouseMove = this.renderer.listen('window', 'mousemove', (event) => {
      const delta = Math.abs(event.pageX - this.startX)

      let newWidth: number;
      let newNeighborWidth: number;
      if ((event.pageX > this.startX && isRightSide)
        || (event.pageX < this.startX && !isRightSide)
      ) {
        newWidth = this.startWidth + delta;
        newNeighborWidth = this.neighborWdith - delta;
      } else {
        newWidth = this.startWidth - delta
        newNeighborWidth = this.neighborWdith + delta;
      }

      this.resizeEle.parentElement.setAttribute('width', `${newWidth}px`);
      this.neighborEle.setAttribute('width', `${newNeighborWidth}px`);
    });
    this.resizeMouseUp = this.renderer.listen('window', 'mouseup', event => {
      event.stopPropagation();
      this.resizeMouseMove();
      this.resizeMouseUp();
    })
  }


}
