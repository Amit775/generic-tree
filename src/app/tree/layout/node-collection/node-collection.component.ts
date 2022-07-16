import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { distinctUntilArrayItemChanged } from '@datorama/akita';
import { Observable, tap } from 'rxjs';
import { TreeQuery } from '../../core/tree/tree.query';
import { TreeService } from '../../core/tree/tree.service';

@Component({
	selector: 'tree-node-collection',
	templateUrl: './node-collection.component.html',
	styleUrls: ['./node-collection.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeCollectionComponent implements OnInit {
	@Input() nodeId!: string;

	public nodesIds$!: Observable<string[]>;

	constructor(
		private treeQuery: TreeQuery,
		private treeService: TreeService
	) { }

	ngOnInit(): void {
		this.nodesIds$ = this.treeService.visibleChildren$().pipe(
			distinctUntilArrayItemChanged(),
		);
	}

	isVisible$(nodeId: string): Observable<boolean> {
		return this.treeQuery.isVisible$(nodeId);
	}

	trackNode(_: number, nodeId: string): string {
		return nodeId;
	}
}
