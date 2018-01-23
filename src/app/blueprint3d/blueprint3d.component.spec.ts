import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Blueprint3dComponent } from './blueprint3d.component';

describe('Blueprint3dComponent', () => {
  let component: Blueprint3dComponent;
  let fixture: ComponentFixture<Blueprint3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Blueprint3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Blueprint3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
