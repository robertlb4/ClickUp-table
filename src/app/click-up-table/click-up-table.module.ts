import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickUpTableComponent } from './click-up-table.component';
import { ClickUpSortModule } from '../click-up-sort/click-up-sort.module';
import { ClickUpResizeModule } from '../click-up-resize/click-up-resize.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OrderByModule } from '../order-by-pipe/order-by.module';


@NgModule({
  imports: [
    CommonModule,
    ClickUpSortModule,
    ClickUpResizeModule,
    DragDropModule,
    OrderByModule,
  ],
  declarations: [
    ClickUpTableComponent,
  ],
  exports: [
    ClickUpTableComponent
  ],
})
export class ClickUpTableModule {}