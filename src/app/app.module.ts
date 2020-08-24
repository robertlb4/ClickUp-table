import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { BreweryListComponent } from './brewery-list/brewery-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './reducers';
import { effects } from './effects';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ClickUpTableComponent } from './click-up-table/click-up-table.component';
import { ClickUpSortComponent } from './click-up-sort/click-up-sort.component';
import { OrderByPipe } from './order-by.pipe';
import { ClickUpResizeComponent } from './click-up-resize/click-up-resize.component';

@NgModule({
  declarations: [
    AppComponent,
    BreweryListComponent,
    ClickUpTableComponent,
    ClickUpSortComponent,
    OrderByPipe,
    ClickUpResizeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
