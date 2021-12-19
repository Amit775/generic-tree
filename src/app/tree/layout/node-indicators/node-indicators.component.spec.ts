import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeIndicatorsComponent } from './node-indicators.component';

describe('NodeIndicatorsComponent', () => {
  let component: NodeIndicatorsComponent;
  let fixture: ComponentFixture<NodeIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeIndicatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
