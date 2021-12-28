import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDropSlotComponent } from './node-drop-slot.component';

describe('NodeDropSlotComponent', () => {
  let component: NodeDropSlotComponent;
  let fixture: ComponentFixture<NodeDropSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeDropSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDropSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
