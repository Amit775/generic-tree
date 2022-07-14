import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { guid, HashMap } from '@datorama/akita';
import { tap, Observable, of, switchMap } from 'rxjs';
import { NodesQuery } from './tree/core/nodes/nodes.query';
import { NodesService } from './tree/core/nodes/nodes.service';
import { TreeQuery } from './tree/core/tree/tree.query';
import { TreeService } from './tree/core/tree/tree.service';
import { SubTree } from './tree/core/tree/tree.store';
import { INodeState } from './tree/models/node.state';

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

	root$!: Observable<SubTree | undefined>;

	ngOnInit(): void {
		// this.treeQuery.selectAll().subscribe(x => console.log('tree', x));
		// this.nodesQuery.selectAll().subscribe(x => console.log('nodes', x));
		this.root$ = this.fetchNodes$().pipe(
			tap(nodes => this.buildStores(nodes)),
			switchMap(() => this.treeQuery.selectEntity('root'))
		);
	}

	fetchNodes$(): Observable<NodeData[]> {
		const nodes: NodeData[] = generateNodes(5);
		return of(nodes);
	}

	buildStores(nodes: NodeData[]): void {
		this.treeService.setSubTrees(this.buildTree(nodes));
		this.nodesService.setNodes(this.convertNodes(nodes));
	}

	buildTree(nodes: NodeData[]): HashMap<SubTree> {
		const indexedByParentId = this.indexByParentId(nodes);
		const subTrees: HashMap<SubTree> = {
			root: {
				id: 'root',
				parentId: null,
				children: indexedByParentId['root'].map(child => child.id)
			}
		};

		function buildSubTree(parentId: string): void {
			const { children } = subTrees[parentId];

			children?.forEach(childId => {
				subTrees[childId] = {
					id: childId,
					parentId: parentId,
					children: indexedByParentId[childId]?.map(grandChild => grandChild.id)
				}

				buildSubTree(childId);
			});
		}

		buildSubTree('root');

		return subTrees;
	}

	indexByParentId(nodes: NodeData[]): HashMap<NodeData[]> {
		const indexedByParentId: HashMap<NodeData[]> = nodes.reduce((result, data) => {
			const parentId = data.parentId || 'root';
			if (!Object.keys(result).includes(parentId)) {
				result[parentId] = [];
			}

			result[parentId].push(data);
			return result;
		}, {} as HashMap<NodeData[]>);
		return indexedByParentId;
	}

	convertNodes(datas: NodeData[]): INodeState[] {
		return datas.map(data => this.convert(data));
	}

	convert(data: NodeData): INodeState {
		return {
			data,
			flags: {},
			id: data.id,
		}
	}

	addNode(): void {
		const parentId = this.nodesQuery.getActiveId()?.[0] || 'root';
		const id = `new node - ${uuid()}`
		const newNode: NodeData = {
			id: id,
			display: id,
			parentId: parentId
		};

		this.treeService.addNode({ id: newNode.id, parentId: newNode.parentId, children: undefined });
		this.nodesService.addNodes([this.convert(newNode)]);
	}

	removeNode(): void {
		const nodeId = this.nodesQuery.getActiveId()?.[0] || 'root';
		this.treeService.removeNode(nodeId);
	}

	updateNode(): void {

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

		nodes.push(...generateNodes(count, id, maxDepth -1));
	}

	return nodes;
}
