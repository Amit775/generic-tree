import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NodesQuery } from './tree/core/nodes/nodes.query';
import { NodesService } from './tree/core/nodes/nodes.service';
import { TreeQuery } from './tree/core/tree/tree.query';
import { TreeService } from './tree/core/tree/tree.service';

interface NodeData {
	display: string;
	id: string;
	parentId: string | null;
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
		private nodesService: NodesService,
		private treeService: TreeService,
		private nodesQuery: NodesQuery,
		private treeQuery: TreeQuery
	) { }

	data$!: Observable<NodeData[]>;

	ngOnInit(): void {
		this.data$ = this.fetchNodes$();
	}

	fetchNodes$(): Observable<NodeData[]> {
		const nodes: NodeData[] = generateNodes(4);
		return of(nodes);
	}

	addNode(): void {
		const parentId = this.nodesQuery.getActiveId()?.[0] || 'root';
		const id = `new node - ${uuid()}`
		const newNode: NodeData = {
			id: id,
			display: id,
			parentId: parentId
		};

		this.treeService.addNode({ id: newNode.id, parentId: newNode.parentId, children: undefined, isExpanded: false });
		this.nodesService.addNodes([{ data: newNode, flags: {}, id: newNode.id }]);
	}

	removeNode(): void {
		const nodeId = this.nodesQuery.getActiveId()?.[0] || 'root';
		this.treeService.removeNode(nodeId);
	}

	updateNode(): void {
		const nodeId = this.nodesQuery.getActiveId()?.[0] || 'root';
		this.nodesService.updateNodeName(nodeId, `updated ${nodeId} to ${uuid()}`);
	}

	expandAll(): void {
		const ids = this.treeQuery.getDescendetsIds('root');
		this.nodesService.updateMultiNodes(ids, e => ({ ...e, isExpanded: true }));
	}

	collapseAll(): void {
		const ids = this.treeQuery.getDescendetsIds('root');
		this.nodesService.updateMultiNodes(ids, e => ({ ...e, isExpanded: false }));
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
		const id = parentId + "abcde"[index]
		nodes.push({
			id: id,
			display: id,
			parentId: parentId || null
		});

		nodes.push(...generateNodes(count, id, maxDepth - 1));
	}

	return nodes;
}
