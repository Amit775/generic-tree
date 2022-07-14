import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NodeDragDropModule } from './features/node-drag-drop/node-drag-drop.module';
import { NodeChildrenComponent } from './layout/node-children/node-children.component';
import { NodeCollectionComponent } from './layout/node-collection/node-collection.component';
import { NodeContentComponent } from './layout/node-content/node-content.component';
import { NodeExpanderComponent } from './layout/node-expander/node-expander.component';
import { NodeWrapperComponent } from './layout/node-wrapper/node-wrapper.component';
import { NodeComponent } from './layout/node/node.component';
import { RootComponent } from './layout/root/root.component';
import { AnimateExpandDirective } from './shared/animate-expand/animate-expand.directive';
import { MaterialModule } from './shared/material/material.module';
import { ToggleOnCheckDirective } from './shared/toggle-on-check.directive';
import { TypePipe } from './shared/type.pipe';


@NgModule({
  declarations: [
    RootComponent,
    NodeComponent,
    NodeWrapperComponent,
    NodeExpanderComponent,
    NodeContentComponent,
    NodeCollectionComponent,
    NodeChildrenComponent,
    AnimateExpandDirective,
    TypePipe,
	ToggleOnCheckDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NodeDragDropModule
  ],
  exports: [
    RootComponent,
    NodeContentComponent,
    NodeComponent,
    NodeWrapperComponent,
    TypePipe
  ]
})
export class TreeModule { }
