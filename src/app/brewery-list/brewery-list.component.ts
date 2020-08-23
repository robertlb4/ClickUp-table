import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { BreweryService } from './brewery.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as breweryActions from '../actions/brewereis.actions';
import { Brewery } from '../interfaces/brewery';
import { getAllBrewery } from '../reducers';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { buffer, map } from 'rxjs/operators';


@Component({
  selector: 'brewery-list',
  templateUrl: './brewery-list.component.html',
  styleUrls: ['./brewery-list.component.scss'],
})
export class BreweryListComponent implements OnInit {


  //resize props
  resizeEle: HTMLInputElement
  neighborEle: HTMLInputElement
  pressed;
  startX;
  startWidth;
  neighborWdith;
  resizeMouseMove: () => void;
  resizeMouseUp: () => void;


  sortRules = [];

  columns = [
    "name",
    "type",
    "state",
    "website",
  ];

  _sortedData: BehaviorSubject<Brewery[]> = new BehaviorSubject([]);

  sorted$: Observable<Brewery[]> = this._sortedData.asObservable();

  breweries$ = this.store.select(getAllBrewery)
    .subscribe(breweries => this._sortedData.next(breweries))


  constructor(
    private store: Store,
    private renderer: Renderer2,
    ) { }

  ngOnInit(): void { 
    this.store.dispatch(breweryActions.loadBreweriesBegin())
  }

  dropListDropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  addSortRule(column: string) {
    let index;
    const existingColumn = this.sortRules
      .find((rule, i) => {
        index = i;
        return rule.column === column
      });

    if (existingColumn) {
      if (existingColumn.direction > 0) {
        existingColumn.direction = -1;
      } else {
        this.sortRules = this.sortRules
          .slice(0, index).concat(this.sortRules.slice(index+1, this.sortRules.length));
      }
    } else {
      this.sortRules.push({ column, direction: 1 });
    }
    this.sort(this._sortedData.value)
  }

  sort(brewereis: Brewery[]) {
    const sorted = [...brewereis].sort((a, b) => {
      let result = 0;
      for (const rule of this.sortRules) {
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
    this._sortedData.next(sorted);
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
