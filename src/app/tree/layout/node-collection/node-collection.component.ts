import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NodesQuery } from '../../core/nodes/nodes.query';
import { TemplatesService, TreeNodeTemplates } from '../../core/templates.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { SubTree } from '../../core/tree/tree.store';
import { INodeState } from '../../models/node.state';

@Component({
	selector: 'tree-node-collection',
	templateUrl: './node-collection.component.html',
	styleUrls: ['./node-collection.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeCollectionComponent implements OnInit, AfterViewInit {
	template: TreeNodeTemplates['full'] | null = null;

	@Input() parent!: SubTree;

	public nodes$!: Observable<INodeState[] | undefined>;

	ngAfterViewInit(): void { }
	constructor(
		private templates: TemplatesService,
		private treeQuery: TreeQuery,
	) { }

	ngOnInit(): void {
		this.template = this.templates.getTemplate('full');
		this.nodes$ = this.treeQuery.selectChildrenOfNode(this.parent.id);
	}

	trackNode(_: number, node: INodeState): string {
		return node.id;
	}

	drop(event: CdkDragDrop<string[]>): void {
		console.log(event.container.data);
		console.log(event);
	}
}
