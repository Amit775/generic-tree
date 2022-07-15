import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { distinctUntilArrayItemChanged } from '@datorama/akita';
import { Observable } from 'rxjs';
import { TemplatesService, TreeNodeTemplates } from '../../core/templates.service';
import { TreeQuery } from '../../core/tree/tree.query';

@Component({
	selector: 'tree-node-collection',
	templateUrl: './node-collection.component.html',
	styleUrls: ['./node-collection.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeCollectionComponent implements OnInit {
	@Input() nodeId!: string;

	public children$!: Observable<string[]>;

	constructor(
		private treeQuery: TreeQuery,
	) { }

	ngOnInit(): void {
		this.children$ = this.treeQuery.selectEntity(this.nodeId, e => e!.children!).pipe(
			distinctUntilArrayItemChanged(),
		);
	}

	trackNode(_: number, nodeId: string): string {
		return nodeId;
	}
}
