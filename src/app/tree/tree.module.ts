import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './layout/root/root.component';
import { NodeComponent } from './layout/node/node.component';
import { NodeWrapperComponent } from './layout/node-wrapper/node-wrapper.component';
import { NodeIndicatorComponent } from './layout/node-indicator/node-indicator.component';
import { NodeExpanderComponent } from './layout/node-expander/node-expander.component';
import { NodeContentComponent } from './layout/node-content/node-content.component';
import { NodeCollectionComponent } from './layout/node-collection/node-collection.component';
import { NodeChildrenComponent } from './layout/node-children/node-children.component';



@NgModule({
  declarations: [
    RootComponent,
    NodeComponent,
    NodeWrapperComponent,
    NodeIndicatorComponent,
    NodeExpanderComponent,
    NodeContentComponent,
    NodeCollectionComponent,
    NodeChildrenComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RootComponent
  ]
})
export class TreeModule { }
