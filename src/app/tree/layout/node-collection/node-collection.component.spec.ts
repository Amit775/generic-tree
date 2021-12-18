import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeCollectionComponent } from './node-collection.component';

describe('NodeCollectionComponent', () => {
  let component: NodeCollectionComponent;
  let fixture: ComponentFixture<NodeCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
