import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeService } from 'src/app/tree/core/node/node.service';
import { INodeState } from 'src/app/tree/models/node.state';
import { NodeDragDropService } from './node-drag-drop.service';

@Component({
	selector: 'tree-node-drop-slot',
	templateUrl: './node-drop-slot.component.html',
	styleUrls: ['./node-drop-slot.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeDropSlotComponent implements OnInit, AfterViewInit {
	otherDropList$!: Observable<CdkDropList[]>;
	@ViewChild(CdkDropList) private dropList!: CdkDropList;

	@Input() node!: INodeState;
	constructor(
		private service: NodeService,
		private dndService: NodeDragDropService
	) { }

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		// this.dndService.registerDragAndDrop(this.dropList);
		// this.otherDropList$ = this.dndService.otherDragAndDrops$(this.dropList)
		// this.otherDropList$.subscribe(x => console.log('other then ' + this.dropList.id, x));
	}

	drop(event: CdkDragDrop<any>): void {
		console.log(event);
	}
}
