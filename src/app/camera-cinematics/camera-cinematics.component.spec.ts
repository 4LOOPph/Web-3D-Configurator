import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraCinematicsComponent } from './camera-cinematics.component';

describe('CameraCinematicsComponent', () => {
  let component: CameraCinematicsComponent;
  let fixture: ComponentFixture<CameraCinematicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraCinematicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraCinematicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
