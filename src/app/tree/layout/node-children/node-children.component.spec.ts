import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeChildrenComponent } from './node-children.component';

describe('NodeChildrenComponent', () => {
  let component: NodeChildrenComponent;
  let fixture: ComponentFixture<NodeChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeChildrenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
