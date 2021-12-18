import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeExpanderComponent } from './node-expander.component';

describe('NodeExpanderComponent', () => {
  let component: NodeExpanderComponent;
  let fixture: ComponentFixture<NodeExpanderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeExpanderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeExpanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
