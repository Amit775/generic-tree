import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeIndicatorComponent } from './node-indicator.component';

describe('NodeIndicatorComponent', () => {
  let component: NodeIndicatorComponent;
  let fixture: ComponentFixture<NodeIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
