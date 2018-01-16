import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnitureComponent } from './furniture.component';

describe('FurnitureComponent', () => {
  let component: FurnitureComponent;
  let fixture: ComponentFixture<FurnitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurnitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
