import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickUpSortComponent } from './click-up-sort.component';

describe('ClickUpSortComponent', () => {
  let component: ClickUpSortComponent;
  let fixture: ComponentFixture<ClickUpSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickUpSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickUpSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
