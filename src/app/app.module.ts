import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { BreweryListComponent } from './brewery-list/brewery-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './reducers';
import { effects } from './effects';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClickUpTableModule } from './click-up-table/click-up-table.module';
import { ClickUpSortModule } from './click-up-sort/click-up-sort.module';
import { OrderByModule } from './order-by-pipe/order-by.module';
import { ClickUpResizeModule } from './click-up-resize/click-up-resize.module';

@NgModule({
  declarations: [
    AppComponent,
    BreweryListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    ClickUpTableModule,
    ClickUpSortModule,
    ClickUpResizeModule,
    OrderByModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
