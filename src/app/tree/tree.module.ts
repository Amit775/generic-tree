import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NodeChildrenComponent } from './layout/node-children/node-children.component';
import { NodeCollectionComponent } from './layout/node-collection/node-collection.component';
import { NodeContentComponent } from './layout/node-content/node-content.component';
import { NodeExpanderComponent } from './layout/node-expander/node-expander.component';
import { NodeIndicatorComponent } from './layout/node-indicators/node-indicator/node-indicator.component';
import { NodeIndicatorsComponent } from './layout/node-indicators/node-indicators.component';
import { NodeWrapperComponent } from './layout/node-wrapper/node-wrapper.component';
import { NodeComponent } from './layout/node/node.component';
import { RootComponent } from './layout/root/root.component';
import { AnimateExpandDirective } from './shared/animate-expand/animate-expand.directive';
import { MaterialModule } from './shared/material/material.module';


@NgModule({
  declarations: [
    RootComponent,
    NodeComponent,
    NodeWrapperComponent,
    NodeIndicatorComponent,
    NodeExpanderComponent,
    NodeContentComponent,
    NodeCollectionComponent,
    NodeChildrenComponent,
    AnimateExpandDirective,
    NodeIndicatorsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    RootComponent
  ]
})
export class TreeModule { }
