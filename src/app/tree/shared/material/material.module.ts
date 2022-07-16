import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    exports: [
        MatIconModule,
        MatButtonModule,
        DragDropModule,
        MatTooltipModule,
        MatListModule,
		ScrollingModule
    ]
})
export class MaterialModule { }