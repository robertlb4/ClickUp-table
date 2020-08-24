import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickUpResizeComponent } from './click-up-resize.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ClickUpResizeComponent,
  ],  
  exports: [
    ClickUpResizeComponent,
  ],
})
export class ClickUpResizeModule {}