import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { distinctUntilArrayItemChanged } from '@datorama/akita';
import { Observable } from 'rxjs';
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
		private treeService: TreeService,
	) { }

	ngOnInit(): void {
		this.nodesIds$ = this.treeService.visibleChildren$().pipe(
			distinctUntilArrayItemChanged(),
		);
	}

	trackNode(_: number, nodeId: string): string {
		return nodeId;
	}
}
