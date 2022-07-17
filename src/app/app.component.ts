import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataQuery } from './tree/core/nodes/nodes.query';
import { DataService } from './tree/core/nodes/nodes.service';
import { TreeQuery } from './tree/core/tree/tree.query';
import { TreeService } from './tree/core/tree/tree.service';
import { createSubTree } from './tree/core/tree/tree.store';

interface NodeData {
	display: string;
	id: string;
	parentId: string | undefined;
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
	title = 'generic-tree';

	constructor(
		private dataService: DataService,
		private treeService: TreeService,
		private dataQuery: DataQuery,
		private treeQuery: TreeQuery
	) { }

	data$!: Observable<NodeData[]>;

	ngOnInit(): void {
		this.data$ = this.fetchNodes$();
	}

	fetchNodes$(): Observable<NodeData[]> {
		const nodes: NodeData[] = generateNodes(6);
		return of(nodes);
	}

	addNode(): void {
		const parentId = this.treeQuery.getSelectedIds()[0] || 'root';
		const id = `new node - ${uuid()}`
		const newNode: NodeData = {
			id: id,
			display: id,
			parentId: parentId
		};

		this.treeService.addNode(createSubTree({ id: newNode.id, parentId: newNode.parentId }));
		this.dataService.addNodes([{ data: newNode, flags: {}, id: newNode.id }]);
	}

	removeNode(): void {
		const nodeId = this.treeQuery.getSelectedIds()[0] || 'root';
		this.treeService.removeNode(nodeId);
	}

	updateNode(): void {
		const nodeId = this.treeQuery.getSelectedIds()[0] || 'root';
		this.dataService.updateNodeName(nodeId, `updated ${nodeId} to ${uuid()}`);
	}

	expandAll(): void {
		const ids = this.treeQuery.getDescendetsIds('root');
		this.treeService.updateMultiNodes(ids, e => ({ ...e, isExpanded: true }));
	}

	collapseAll(): void {
		const ids = this.treeQuery.getDescendetsIds('root');
		this.treeService.updateMultiNodes(ids, e => ({ ...e, isExpanded: false }));
	}
}

let lastid: string;
function uuid(): string {
	if (!lastid) {
		lastid = '0';
	} else {
		lastid = `${(+lastid) + 1}`;
	}

	return lastid;
}

function generateNodes(count: number, parentId: string = '', maxDepth: number = 5): NodeData[] {
	const nodes: NodeData[] = [];
	if (maxDepth === 0) return nodes;
	for (let index = 0; index < count; index++) {
		const id = parentId + "abcdef"[index]
		nodes.push({
			id: id,
			display: id,
			parentId: parentId || undefined
		});

		nodes.push(...generateNodes(count, id, maxDepth - 1));
	}

	return nodes;
}
