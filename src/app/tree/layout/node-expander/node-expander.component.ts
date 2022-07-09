import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { NodeService } from '../../core/node/node.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { SubTree } from '../../core/tree/tree.store';
import { INodeState } from '../../models/node.state';

@Component({
	selector: 'tree-node-expander',
	templateUrl: './node-expander.component.html',
	styleUrls: ['./node-expander.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeExpanderComponent implements OnInit {

	public subTree!: SubTree;
	@Input() node!: INodeState;
	@Output() toggled = new EventEmitter<void>();

	isExpanded$!: Observable<boolean | undefined>;
	hasChildren$!: Observable<boolean | undefined>

	constructor(
		private service: NodeService,
		private treeQuery: TreeQuery
	) { }

	ngOnInit(): void {
		this.subTree = this.treeQuery.getEntity(this.node.id)!;
		this.isExpanded$ = this.service.selectFlag('expanded');
		this.hasChildren$ = this.treeQuery.selectEntity(this.node.id).pipe(
			map(node => node?.children && node.children.length > 0),
			tap((x) => console.log(this.node,x,  'has children'))
			);

	}

	toggle(): void {
		this.toggled.emit();
	}


}
