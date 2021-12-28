import { NgModule } from "@angular/core";

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    exports: [
        MatIconModule,
        MatButtonModule,
        DragDropModule,
        MatTooltipModule
    ]
})
export class MaterialModule { }