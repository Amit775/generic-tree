import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeService } from '../../core/node/node.service';
import { SubTree } from '../../core/tree/tree.store';
import { NodeDragDropService } from '../../features/node-drag-drop/node-drop-slot/node-drag-drop.service';

@Component({
	selector: 'tree-node-children',
	templateUrl: './node-children.component.html',
	styleUrls: ['./node-children.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeChildrenComponent implements OnInit {

	@Input() subTree!: SubTree;

	constructor(
		private service: NodeService,
		private dragService: NodeDragDropService
	) { }

	isExpanded$!: Observable<boolean | undefined>;

	ngOnInit(): void {
		this.isExpanded$ = this.service.selectFlag('expanded');
	}

	onDrop(event: CdkDragDrop<SubTree>) {
		this.dragService.onDragDrop(event);
	}

	get hasChildren(): boolean {
		return this.subTree.children != null && this.subTree.children.length > 0;
	}

}
