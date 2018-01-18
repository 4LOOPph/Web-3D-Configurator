import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbxsampleComponent } from './fbxsample.component';

describe('FbxsampleComponent', () => {
  let component: FbxsampleComponent;
  let fixture: ComponentFixture<FbxsampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbxsampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbxsampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
