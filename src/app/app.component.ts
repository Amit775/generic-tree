import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { from, map, Observable, of, tap } from 'rxjs';
import { TreeQuery } from './tree/core/tree/tree.query';
import { TreeService } from './tree/core/tree/tree.service';
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
		private service: TreeService,
		private query: TreeQuery
	) { }

	nodes$!: Observable<INodeState[]>;
	ngOnInit(): void {
		this.nodes$ = this.fetchNodes$().pipe(map(nodes => this.convertNodes(nodes)));
	}

	fetchNodes$(): Observable<NodeData[]> {
		const nodes: NodeData[] = [
			{ id: 'a', display: 'a', parentId: null },
			{ id: 'b', display: 'b', parentId: null },
			{ id: 'c', display: 'c', parentId: null },
			{ id: 'ba', display: 'ba', parentId: 'b' },
			{ id: 'ab', display: 'ab', parentId: 'a' }
		]
		return of(nodes);
	}

	convertNodes(datas: NodeData[]): INodeState[] {
		const nodes: INodeState[] = [];
		const indexedByParentId: { [parentId: string]: NodeData[] } = datas.reduce((result, data) => {
			const parentId = data.parentId || 'root';
			if (!Object.keys(result).includes(parentId)) {
				result[parentId] = [];
			}

			result[parentId].push(data);
			return result;
		}, {} as { [parentId: string]: NodeData[] })

		datas.map((data, index) => this.convert(nodes, data, index, undefined));
		console.log(nodes);

		return nodes;
	}

	convert(nodes: INodeState[], data: any, index: number, parent?: INodeState | undefined): INodeState {
		const node: INodeState = {
			data,
			path: parent ? [...parent.path, parent.id] : ['root'],
			flags: {},
			id: uuid()
		}

		nodes.push(node);

		if (data.children) {
			const childrenNodes: INodeState[] = data.children.map((childData: any, childIndex: number) => this.convert(nodes, childData, childIndex, node));
			nodes = [...nodes, ...childrenNodes];
			node.children = childrenNodes;
		}

		return node;
	}

	drop(event: CdkDragDrop<string>): void {
		console.log(event);
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
