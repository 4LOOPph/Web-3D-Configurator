import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Furniture2Component } from './furniture2.component';

describe('Furniture2Component', () => {
  let component: Furniture2Component;
  let fixture: ComponentFixture<Furniture2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Furniture2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Furniture2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
