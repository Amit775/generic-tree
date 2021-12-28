import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { dragAndDropManagerDirective, dragAndDropManagerRootDirective } from './node-drop-slot/drag-and-drop-manager.directive';
import { NodeDropSlotComponent } from './node-drop-slot/node-drop-slot.component';

@NgModule({
  declarations: [
    NodeDropSlotComponent,
    dragAndDropManagerDirective,
    dragAndDropManagerRootDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NodeDropSlotComponent,
    dragAndDropManagerDirective,
    dragAndDropManagerRootDirective
  ]
})
export class NodeDragDropModule { }
