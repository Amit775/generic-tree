import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NodeDragDropModule } from './features/node-drag-drop/node-drag-drop.module';
import { NodeCollectionComponent } from './layout/node-collection/node-collection.component';
import { NodeContentComponent } from './layout/node-content/node-content.component';
import { NodeExpanderComponent } from './layout/node-expander/node-expander.component';
import { NodeIndentComponent } from './layout/node-indent/node-indent.component';
import { NodeWrapperComponent } from './layout/node-wrapper/node-wrapper.component';
import { NodeComponent } from './layout/node/node.component';
import { RootComponent } from './layout/root/root.component';
import { MaterialModule } from './shared/material/material.module';
import { NotNullPipe } from './shared/not-null.pipe';

@NgModule({
	declarations: [
		RootComponent,
		NodeComponent,
		NodeWrapperComponent,
		NodeExpanderComponent,
		NodeContentComponent,
		NodeCollectionComponent,
		NodeIndentComponent,
		NotNullPipe,
	],
	imports: [
		CommonModule,
		MaterialModule,
		NodeDragDropModule,
	],
	exports: [
		RootComponent,
		NodeContentComponent,
		NodeComponent,
		NodeWrapperComponent,
		NotNullPipe
	]
})
export class TreeModule { }
