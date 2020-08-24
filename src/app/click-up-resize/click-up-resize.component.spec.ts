import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickUpResizeComponent } from './click-up-resize.component';

describe('ClickUpResizeComponent', () => {
  let component: ClickUpResizeComponent;
  let fixture: ComponentFixture<ClickUpResizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickUpResizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickUpResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
