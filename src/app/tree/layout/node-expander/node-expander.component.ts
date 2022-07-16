import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeQuery } from '../../core/tree/tree.query';
import { SubTree } from '../../core/tree/tree.store';

@Component({
	selector: 'tree-node-expander',
	templateUrl: './node-expander.component.html',
	styleUrls: ['./node-expander.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeExpanderComponent implements OnChanges {

	@Input() nodeId!: string;

	public subTree!: SubTree;

	public isExpanded$!: Observable<boolean | undefined>;

	constructor(
		private query: TreeQuery,
	) { }

	ngOnChanges(): void {
		this.isExpanded$ = this.query.selectEntity(this.nodeId, s => s!.isExpanded);
		this.subTree = this.query.getEntity(this.nodeId)!;
	}
}
