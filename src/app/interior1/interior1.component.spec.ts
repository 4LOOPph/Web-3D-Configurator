import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Interior1Component } from './interior1.component';

describe('Interior1Component', () => {
  let component: Interior1Component;
  let fixture: ComponentFixture<Interior1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Interior1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Interior1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
