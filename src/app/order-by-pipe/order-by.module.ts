import { NgModule } from '@angular/core';
import { OrderByPipe } from './order-by.pipe';


@NgModule({
  declarations: [
    OrderByPipe,
  ],
  exports: [OrderByPipe],
  providers: [],
})
export class OrderByModule {}