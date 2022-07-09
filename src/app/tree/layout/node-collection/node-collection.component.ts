import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TemplatesService, TreeNodeTemplates } from '../../core/templates.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { SubTree } from '../../core/tree/tree.store';

@Component({
	selector: 'tree-node-collection',
	templateUrl: './node-collection.component.html',
	styleUrls: ['./node-collection.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeCollectionComponent implements OnInit {
	template: TreeNodeTemplates['full'] | null = null;

	@Input() subTree!: SubTree;

	public children$!: Observable<SubTree[]>;

	constructor(
		private templates: TemplatesService,
		private treeQuery: TreeQuery,
	) { }

	ngOnInit(): void {
		this.template = this.templates.getTemplate('full');
		this.children$ = this.treeQuery.selectMany(this.subTree.children!);
	}

	trackNode(_: number, node: SubTree): string {
		return node.id;
	}

	drop(event: CdkDragDrop<string[]>): void {
		console.log(event.container.data);
		console.log(event);
	}
}
