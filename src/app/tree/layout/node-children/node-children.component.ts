import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { filterNilValue } from '@datorama/akita';
import { Observable, tap } from 'rxjs';
import { NodeService } from '../../core/node/node.service';
import { NodesQuery } from '../../core/nodes/nodes.query';
import { TreeQuery } from '../../core/tree/tree.query';
import { SubTree } from '../../core/tree/tree.store';
import { NodeDragDropService } from '../../features/node-drag-drop/node-drop-slot/node-drag-drop.service';
import { INodeState } from '../../models/node.state';

@Component({
	selector: 'tree-node-children',
	templateUrl: './node-children.component.html',
	styleUrls: ['./node-children.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeChildrenComponent implements OnInit {

	@Input() node!: INodeState;
	constructor(
		private treeQuery: TreeQuery,
		private service: NodeService,
		private dragService: NodeDragDropService
	) { }

	children$!: Observable<INodeState[]>;
	node$!: Observable<SubTree>;
	isExpanded$!: Observable<boolean | undefined>;

	ngOnInit(): void {
		console.log(this.node);
		this.children$ = this.treeQuery.selectChildrenOfNode(this.node.id).pipe(tap(x => console.log('chilren of', this.node, x)));
		this.node$ = this.treeQuery.selectEntity(this.node.id).pipe(filterNilValue());
		this.isExpanded$ = this.service.selectFlag('expanded');
	}

	onDrop(event: CdkDragDrop<INodeState>) {
		this.dragService.onDragDrop(event);
	}

}
