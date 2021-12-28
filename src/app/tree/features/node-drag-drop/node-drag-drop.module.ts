import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { NodeDropSlotComponent } from './node-drop-slot/node-drop-slot.component';

@NgModule({
  declarations: [
    NodeDropSlotComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NodeDropSlotComponent
  ]
})
export class NodeDragDropModule { }
