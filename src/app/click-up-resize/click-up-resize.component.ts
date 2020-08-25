import { Component, OnInit, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: '[clickUpResize]',
  templateUrl: './click-up-resize.component.html',
  styleUrls: ['./click-up-resize.component.scss']
})
export class ClickUpResizeComponent {
  @Input() leftHandle: boolean;
  @Input() rightHandle: boolean;


  neighborEle: HTMLInputElement
  startX;
  startWidth;
  neighborWdith;
  resizeMouseMove: () => void;
  resizeMouseUp: () => void;

  constructor(
    private host: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngAfterViewInit() {}

  ngOnDestroy() {
    if (this.resizeMouseMove) this.resizeMouseMove();
    if (this.resizeMouseUp) this.resizeMouseUp();
  }

  resizeColumn(mouseEvent: MouseEvent) {
    mouseEvent.stopPropagation();
    mouseEvent.preventDefault();

    const target = <HTMLInputElement>mouseEvent.target
    const isRightSide = target.classList.contains('resize-handle-right');

    this.neighborEle = isRightSide
      ? this.host.nativeElement.nextElementSibling
      : this.host.nativeElement.previousElementSibling;

    if (this.neighborEle === null) return

    this.startX = mouseEvent.pageX;
    this.startWidth = this.host.nativeElement.clientWidth;
    this.neighborWdith = this.neighborEle.clientWidth;
    this.initResize(isRightSide);
  }

  private initResize(isRightSide: boolean) {
    this.resizeMouseMove = this.renderer.listen('window', 'mousemove', (event) => {
      event.stopPropagation();
      event.preventDefault();

      const delta = Math.abs(event.pageX - this.startX);

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
      
      this.host.nativeElement.style.width = `${newWidth}px`;
      this.neighborEle.style.width = `${newNeighborWidth}px`;
    });
    this.resizeMouseUp = this.renderer.listen('window', 'mouseup', event => {
      this.resizeMouseMove();
      this.resizeMouseUp();
    })
  }

}
